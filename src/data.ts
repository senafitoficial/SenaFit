export type AprendizDemo = {
  id: number;
  nombre: string;
  documento: string;
  ficha: string;
  centroFormacion: string;
  estado: boolean;
  discapacidad: string;
  iniciales: string;
};

export const aprendicesIniciales: AprendizDemo[] = [
  {
    id: 1,
    nombre: "Valentina Rodríguez",
    documento: "1.014.287.392",
    ficha: "2678341",
    centroFormacion: "Servicios Financieros",
    estado: true,
    discapacidad: "Ninguna",
    iniciales: "VR",
  },
  {
    id: 2,
    nombre: "Mateo Hernández",
    documento: "1.002.845.127",
    ficha: "2691054",
    centroFormacion: "Gestión Administrativa",
    estado: true,
    discapacidad: "Ninguna",
    iniciales: "MH",
  },
  {
    id: 3,
    nombre: "Laura Sofía Castro",
    documento: "1.023.671.455",
    ficha: "2679012",
    centroFormacion: "Servicios Financieros",
    estado: true,
    discapacidad: "Visual",
    iniciales: "LC",
  },
  {
    id: 4,
    nombre: "Santiago Moreno",
    documento: "1.019.342.876",
    ficha: "2684450",
    centroFormacion: "Diseño y Metrología",
    estado: false,
    discapacidad: "Ninguna",
    iniciales: "SM",
  },
  {
    id: 5,
    nombre: "Mariana López",
    documento: "1.008.993.214",
    ficha: "2692108",
    centroFormacion: "Gestión Administrativa",
    estado: true,
    discapacidad: "Ninguna",
    iniciales: "ML",
  },
];
