import { supabase } from "../lib/supabaseClient";

type AprendizFila = {
  id: string;
  nombre: string;
  documento: string;
  ficha: string;
  centro_formacion: string;
  estado: boolean;
  discapacidad: string;
  iniciales: string;
  fecha_creacion: string;
};

// Modelo de dominio en español; las columnas de Supabase se adaptan en este servicio.
export interface Aprendiz {
  id: string;
  nombre: string;
  documento: string;
  ficha: string;
  centroFormacion: string;
  estado: boolean;
  discapacidad: string;
  iniciales: string;
  fechaCreacion: string;
}

export type CrearAprendizDTO = {
  nombre: string;
  documento: string;
  ficha: string;
  centroFormacion: string;
  estado: boolean;
  discapacidad: string;
  iniciales?: string;
};

export type ActualizarAprendizDTO = Partial<CrearAprendizDTO>;

export class AprendizServiceError extends Error {
  public readonly codigoEstado: number;

  constructor(message: string, codigoEstado: number) {
    super(message);
    this.name = "AprendizServiceError";
    this.codigoEstado = codigoEstado;
  }
}

function mapearFila(fila: AprendizFila): Aprendiz {
  return {
    id: fila.id,
    nombre: fila.nombre,
    documento: fila.documento,
    ficha: fila.ficha,
    centroFormacion: fila.centro_formacion,
    estado: fila.estado,
    discapacidad: fila.discapacidad,
    iniciales: fila.iniciales,
    fechaCreacion: fila.fecha_creacion,
  };
}

export class AprendicesService {
  private generarIniciales(nombre: string): string {
    return nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((parte) => parte[0] ?? "")
      .join("")
      .toUpperCase();
  }

  private validarId(id: string): void {
    const expresionId =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!expresionId.test(id)) {
      throw new AprendizServiceError(`"${id}" no es un ID válido`, 400);
    }
  }

  private manejarError(
    error: { code?: string; message: string },
    operacion: string,
  ): never {
    if (error.code === "23505") {
      throw new AprendizServiceError(
        "Ya existe un aprendiz con ese documento",
        409,
      );
    }

    if (error.code === "42501") {
      throw new AprendizServiceError(
        "No tienes permisos para realizar esta operación",
        403,
      );
    }

    if (error.code === "23502" || error.code === "23514") {
      throw new AprendizServiceError(
        `Datos no válidos: ${error.message}`,
        400,
      );
    }

    throw new AprendizServiceError(
      `Error al ${operacion}: ${error.message}`,
      500,
    );
  }

  async create(datos: CrearAprendizDTO): Promise<Aprendiz> {
    if (
      !datos.nombre.trim() ||
      !datos.documento.trim() ||
      !datos.ficha.trim() ||
      !datos.centroFormacion.trim()
    ) {
      throw new AprendizServiceError(
        "Todos los campos obligatorios deben estar completos",
        400,
      );
    }

    const { data, error } = await supabase
      .from("aprendices")
      .insert({
        nombre: datos.nombre.trim(),
        documento: datos.documento.trim(),
        ficha: datos.ficha.trim(),
        centro_formacion: datos.centroFormacion.trim(),
        estado: datos.estado,
        discapacidad: datos.discapacidad || "Ninguna",
        iniciales:
          datos.iniciales ?? this.generarIniciales(datos.nombre),
      })
      .select("*")
      .single();

    if (error) {
      this.manejarError(error, "registrar el aprendiz");
    }

    if (!data) {
      throw new AprendizServiceError(
        "No se pudo registrar el aprendiz",
        500,
      );
    }

    return mapearFila(data);
  }

  async findAll(): Promise<Aprendiz[]> {
    const { data, error } = await supabase
      .from("aprendices")
      .select("*")
      .order("fecha_creacion", { ascending: false });

    if (error) {
      this.manejarError(error, "consultar los aprendices");
    }

    return (data ?? []).map(mapearFila);
  }

  async findOne(id: string): Promise<Aprendiz> {
    this.validarId(id);

    const { data, error } = await supabase
      .from("aprendices")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      this.manejarError(error, "buscar el aprendiz");
    }

    if (!data) {
      throw new AprendizServiceError(
        `No existe un aprendiz con el ID ${id}`,
        404,
      );
    }

    return mapearFila(data);
  }

  async update(
    id: string,
    datos: ActualizarAprendizDTO,
  ): Promise<Aprendiz> {
    this.validarId(id);

    if (Object.keys(datos).length === 0) {
      throw new AprendizServiceError(
        "Debes enviar datos para actualizar",
        400,
      );
    }

    const cambios: Partial<AprendizFila> = {};

    if (datos.nombre !== undefined) {
      const nombre = datos.nombre.trim();

      if (!nombre) {
        throw new AprendizServiceError(
          "El nombre no puede estar vacío",
          400,
        );
      }

      cambios.nombre = nombre;
      cambios.iniciales = datos.iniciales ?? this.generarIniciales(nombre);
    }

    if (datos.documento !== undefined) {
      const documento = datos.documento.trim();

      if (!documento) {
        throw new AprendizServiceError(
          "El documento no puede estar vacío",
          400,
        );
      }

      cambios.documento = documento;
    }

    if (datos.ficha !== undefined) cambios.ficha = datos.ficha.trim();
    if (datos.centroFormacion !== undefined) {
      cambios.centro_formacion = datos.centroFormacion.trim();
    }
    if (datos.estado !== undefined) {
      cambios.estado = datos.estado;
    }
    if (datos.discapacidad !== undefined) {
      cambios.discapacidad = datos.discapacidad;
    }
    if (datos.iniciales !== undefined) {
      cambios.iniciales = datos.iniciales;
    }

    const { data, error } = await supabase
      .from("aprendices")
      .update(cambios)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      this.manejarError(error, "actualizar el aprendiz");
    }

    if (!data) {
      throw new AprendizServiceError(
        `No existe un aprendiz con el ID ${id}`,
        404,
      );
    }

    return mapearFila(data);
  }

  async remove(id: string) {
    this.validarId(id);

    const { data, error } = await supabase
      .from("aprendices")
      .delete()
      .eq("id", id)
      .select("id, nombre")
      .maybeSingle();

    if (error) {
      this.manejarError(error, "eliminar el aprendiz");
    }

    if (!data) {
      throw new AprendizServiceError(
        `No existe un aprendiz con el ID ${id}`,
        404,
      );
    }

    return {
      mensaje: `${data.nombre} fue eliminado`,
      aprendiz: { id: data.id, nombre: data.nombre },
    };
  }
}

export const aprendicesService = new AprendicesService();
