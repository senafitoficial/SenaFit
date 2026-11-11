export type Learner = {
  id: number;
  name: string;
  document: string;
  ficha: string;
  center: string;
  status: "Activo" | "Inactivo";
  disability: string;
  initials: string;
};

export const initialLearners: Learner[] = [
  {
    id: 1,
    name: "Valentina Rodríguez",
    document: "1.014.287.392",
    ficha: "2678341",
    center: "Servicios Financieros",
    status: "Activo",
    disability: "Ninguna",
    initials: "VR",
  },
  {
    id: 2,
    name: "Mateo Hernández",
    document: "1.002.845.127",
    ficha: "2691054",
    center: "Gestión Administrativa",
    status: "Activo",
    disability: "Ninguna",
    initials: "MH",
  },
  {
    id: 3,
    name: "Laura Sofía Castro",
    document: "1.023.671.455",
    ficha: "2679012",
    center: "Servicios Financieros",
    status: "Activo",
    disability: "Visual",
    initials: "LC",
  },
  {
    id: 4,
    name: "Santiago Moreno",
    document: "1.019.342.876",
    ficha: "2684450",
    center: "Diseño y Metrología",
    status: "Inactivo",
    disability: "Ninguna",
    initials: "SM",
  },
  {
    id: 5,
    name: "Mariana López",
    document: "1.008.993.214",
    ficha: "2692108",
    center: "Gestión Administrativa",
    status: "Activo",
    disability: "Ninguna",
    initials: "ML",
  },
];
