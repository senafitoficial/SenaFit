
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  ClockAlert,
  Download,
  Pencil,
  Plus,
  UserRound,
  X,
  Trash2,
} from "lucide-react";

import { Modal } from "../components/Modal";
import {
  FilterButton,
  PageIntro,
  SearchField,
  InsigniaEstado,
} from "../components/PageUI";

import {
  aprendicesService,
  type Aprendiz,
  type CrearAprendizDTO,
} from "../services/aprendices.service";


// Tipo utilizado para mostrar los datos en la interfaz
type VistaAprendiz = {
  id: string;
  nombre: string;
  documento: string;
  ficha: string;
  centroFormacion: string;
  estado: boolean;
  discapacidad: string;
  iniciales: string;
};

// Formulario vacío
const emptyForm = {
  nombre: "",
  documento: "",
  ficha: "",
  centroFormacion: "Centro de Comercio y Servicios",
  estado: true,
  discapacidad: "Ninguna",
};

// Convierte los datos de Supabase al formato visual de Figma
function mapAprendiz(aprendiz: Aprendiz): VistaAprendiz {
  return {
    id: aprendiz.id,
    nombre: aprendiz.nombre,
    documento: aprendiz.documento,
    ficha: aprendiz.ficha,
    centroFormacion: aprendiz.centroFormacion,
    estado: aprendiz.estado,
    discapacidad: aprendiz.discapacidad,
    iniciales: aprendiz.iniciales,
  };
}

// Obtener un mensaje comprensible de los errores
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}

export function Aprendices() {
  const [aprendices, setAprendices] = useState<VistaAprendiz[]>([]);
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [editing, setEditing] = useState<VistaAprendiz | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Consultar aprendices al abrir la página
  useEffect(() => {
    let mounted = true;

    async function loadLearners() {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await aprendicesService.findAll();

        if (mounted) {
          setAprendices(data.map(mapAprendiz));
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(getErrorMessage(error));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadLearners();

    return () => {
      mounted = false;
    };
  }, []);

  // Buscar y filtrar aprendices
  const filtered = useMemo(
    () =>
      aprendices.filter((aprendiz) => {
        const matchesSearch = `${aprendiz.nombre} ${aprendiz.documento} ${aprendiz.ficha}`
          .toLowerCase()
          .includes(search.toLowerCase());

        return (
          matchesSearch &&
          (filtroEstado === "Todos" ||
            (aprendiz.estado ? "Activo" : "Inactivo") === filtroEstado)
        );
      }),
    [aprendices, search, filtroEstado],
  );

  // Abrir formulario para registrar
  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setErrorMessage("");
    setModalOpen(true);
  }

  // Abrir formulario para editar
  function openEdit(aprendiz: VistaAprendiz) {
    setEditing(aprendiz);

    setForm({
      nombre: aprendiz.nombre,
      documento: aprendiz.documento,
      ficha: aprendiz.ficha,
      centroFormacion: aprendiz.centroFormacion,
      estado: aprendiz.estado,
      discapacidad: aprendiz.discapacidad,
    });

    setErrorMessage("");
    setModalOpen(true);
  }

  // Registrar o actualizar un aprendiz en Supabase
  async function saveLearner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setErrorMessage("");

      const datos: CrearAprendizDTO = {
        nombre: form.nombre.trim(),
        documento: form.documento.trim(),
        ficha: form.ficha.trim(),
        centroFormacion: form.centroFormacion,
        estado: form.estado,
        discapacidad: form.discapacidad.trim(),
      };

      let savedAprendiz: Aprendiz;

      if (editing) {
        // UPDATE
        savedAprendiz = await aprendicesService.update(
          editing.id,
          datos,
        );
      } else {
        // CREATE
        savedAprendiz = await aprendicesService.create(datos);
      }

      const learnerView = mapAprendiz(savedAprendiz);

      if (editing) {
        setAprendices((current) =>
          current.map((item) =>
            item.id === editing.id ? learnerView : item,
          ),
        );
      } else {
        setAprendices((current) => [learnerView, ...current]);
      }

      setModalOpen(false);
      setForm(emptyForm);
      setEditing(null);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  // Eliminar un aprendiz de Supabase
  async function deleteLearner(aprendiz: VistaAprendiz) {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar a ${aprendiz.nombre}? Esta acción no se puede deshacer.`,
    );

    if (!confirmed) return;

    try {
      setErrorMessage("");

      await aprendicesService.remove(aprendiz.id);

      setAprendices((current) =>
        current.filter((item) => item.id !== aprendiz.id),
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  return (
    <>
      <PageIntro
        title="Gestión de aprendices"
        description="Administra la información y el estado de los aprendices registrados."
        action={
          <button
            className="button button--primary"
            onClick={openCreate}
          >
            <Plus size={18} /> Nuevo aprendiz
          </button>
        }
      />

      <section className="enrollment-summary" aria-label="Resumen de inscripciones">
        <article>
          <div className="summary-icon">
            <UserRound size={20} />
          </div>
          <div>
            <span>Total inscripciones</span>
            <strong>1.086</strong>
            <small>Histórico del gimnasio</small>
          </div>
        </article>
        <article>
          <div className="summary-icon">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Inscripciones vigentes</span>
            <strong>934</strong>
            <small>
              <b>86%</b> del total
            </small>
          </div>
        </article>
        <article>
          <div className="summary-icon">
            <ClockAlert size={20} />
          </div>
          <div>
            <span>Próximas a vencer</span>
            <strong>28</strong>
            <small>En los siguientes 15 días</small>
          </div>
        </article>
      </section>

      {errorMessage && (
        <div
          role="alert"
          style={{ color: "#b42318", marginBottom: "16px" }}
        >
          {errorMessage}
        </div>
      )}

      <section className="panel data-panel">
        <div className="table-toolbar">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre, documento o ficha..."
          />

          <div className="toolbar-actions">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              aria-label="Filtrar por estado"
            >
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>

            <FilterButton />

            <button className="button button--secondary" type="button">
              <Download size={17} /> Exportar
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Aprendiz</th>
                <th>Documento</th>
                <th>Ficha</th>
                <th>Centro de formación</th>
                <th>Estado</th>
                <th>Discapacidad</th>
                <th>
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>Cargando aprendices...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    No hay aprendices para mostrar.
                  </td>
                </tr>
              ) : (
                filtered.map((aprendiz) => (
                  <tr key={aprendiz.id}>
                    <td>
                      <div className="person-cell">
                        <div className="avatar avatar--soft">
                          {aprendiz.iniciales}
                        </div>

                        <div>
                          <strong>{aprendiz.nombre}</strong>
                          <small>Documento: {aprendiz.documento}</small>
                        </div>
                      </div>
                    </td>

                    <td>{aprendiz.documento}</td>

                    <td>
                      <span className="code-pill">
                        {aprendiz.ficha}
                      </span>
                    </td>

                    <td>{aprendiz.centroFormacion}</td>

                    <td>
                      <InsigniaEstado
                        estado={aprendiz.estado ? "Activo" : "Inactivo"}
                      />
                    </td>

                    <td>{aprendiz.discapacidad}</td>

                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          onClick={() => openEdit(aprendiz)}
                          aria-label={`Editar a ${aprendiz.nombre}`}
                          title="Editar aprendiz"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteLearner(aprendiz)}
                          aria-label={`Eliminar a ${aprendiz.nombre}`}
                          title="Eliminar aprendiz"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Mostrando {filtered.length} de {aprendices.length} aprendices
          </span>
        </div>
      </section>

      {modalOpen && (
        <Modal
          title={editing ? "Editar aprendiz" : "Registrar aprendiz"}
          description="Completa la información personal y académica."
          onClose={() => {
            if (!saving) setModalOpen(false);
          }}
        >
          <form onSubmit={saveLearner} className="modal-form">
            <div className="modal-avatar">
              <UserRound size={24} />
              <span>Información del aprendiz</span>
            </div>

            <div className="form-grid">
              <label className="form-field form-field--wide">
                <span>Nombre completo</span>
                <input
                  required
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({ ...form, nombre: e.target.value })
                  }
                  placeholder="Ej. María Rodríguez"
                />
              </label>

              <label className="form-field">
                <span>Documento</span>
                <input
                  required
                  value={form.documento}
                  onChange={(e) =>
                    setForm({ ...form, documento: e.target.value })
                  }
                  placeholder="Número de documento"
                />
              </label>

              <label className="form-field">
                <span>Número de ficha</span>
                <input
                  required
                  value={form.ficha}
                  onChange={(e) =>
                    setForm({ ...form, ficha: e.target.value })
                  }
                  placeholder="Ej. 2678341"
                />
              </label>

              <label className="form-field form-field--wide">
                <span>Centro de formación</span>
                <select
                  value={form.centroFormacion}
                  onChange={(e) =>
                    setForm({ ...form, centroFormacion: e.target.value })
                  }
                  required
                >
                  <option>Centro de Automatización Industrial</option>
                  <option>Centro de Comercio y Servicios</option>
                  <option>
                    Centro de Procesos Industriales y Construcción
                  </option>
                  <option>Centro para la Formación Cafetera</option>
                  <option>Centro Pecuario y Agroempresarial</option>
                </select>
              </label>

              <label className="form-field">
                <span>Estado</span>
                <select
                  value={form.estado ? "Activo" : "Inactivo"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      estado: e.target.value === "Activo",
                    })
                  }
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </label>

              <label className="form-field">
                <span>Discapacidad</span>
                <input
                  value={form.discapacidad}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discapacidad: e.target.value,
                    })
                  }
                  placeholder="Escriba 'Ninguna' o el tipo"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                <X size={17} /> Cancelar
              </button>

              <button
                className="button button--primary"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Guardando..."
                  : editing
                    ? "Guardar cambios"
                    : "Registrar aprendiz"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
