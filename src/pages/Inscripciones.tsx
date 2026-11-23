import { useMemo, useState, type FormEvent } from "react";
import {
  CalendarClock,
  CheckCircle2,
  ClockAlert,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Users,
  X,
} from "lucide-react";
import { Modal } from "../components/Modal";
import {
  FilterButton,
  InsigniaEstado,
  PageIntro,
  SearchField,
} from "../components/PageUI";

type Inscripcion = {
  id: number;
  nombre: string;
  iniciales: string;
  ficha: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  tiempoRestante: string;
};
const inscripcionesIniciales: Inscripcion[] = [
  {
    id: 1,
    nombre: "Valentina Rodríguez",
    iniciales: "VR",
    ficha: "2678341",
    fechaInicio: "12 feb 2025",
    fechaFin: "12 ago 2025",
    estado: "Vigente",
    tiempoRestante: "84 días",
  },
  {
    id: 2,
    nombre: "Mateo Hernández",
    iniciales: "MH",
    ficha: "2691054",
    fechaInicio: "05 mar 2025",
    fechaFin: "05 jun 2025",
    estado: "Por vencer",
    tiempoRestante: "16 días",
  },
  {
    id: 3,
    nombre: "Laura Sofía Castro",
    iniciales: "LC",
    ficha: "2679012",
    fechaInicio: "18 ene 2025",
    fechaFin: "18 jul 2025",
    estado: "Vigente",
    tiempoRestante: "59 días",
  },
  {
    id: 4,
    nombre: "Ana María Gómez",
    iniciales: "AG",
    ficha: "2684450",
    fechaInicio: "20 feb 2025",
    fechaFin: "20 may 2025",
    estado: "Vence hoy",
    tiempoRestante: "Hoy",
  },
  {
    id: 5,
    nombre: "Nicolás Vargas",
    iniciales: "NV",
    ficha: "2692108",
    fechaInicio: "22 feb 2025",
    fechaFin: "22 may 2025",
    estado: "Por vencer",
    tiempoRestante: "2 días",
  },
];

export function Inscripciones() {
  const [inscripciones, setInscripciones] = useState(inscripcionesIniciales);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [learner, setLearner] = useState("");
  const filtered = useMemo(
    () =>
      inscripciones.filter(
        (item) =>
          item.nombre.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "Todas" || item.estado === filter),
      ),
    [inscripciones, search, filter],
  );

  function createEnrollment(event: FormEvent) {
    event.preventDefault();
    const nombre = learner || "Juan Felipe Torres";
    const iniciales = nombre
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    setInscripciones([
      {
        id: Date.now(),
        nombre,
        iniciales,
        ficha: "2701184",
        fechaInicio: "20 may 2025",
        fechaFin: "20 ago 2025",
        estado: "Vigente",
        tiempoRestante: "92 días",
      },
      ...inscripciones,
    ]);
    setModalOpen(false);
    setLearner("");
  }

  return (
    <>
      <PageIntro
        title="Gestión de inscripciones"
        description="Controla las vigencias, renovaciones y próximas fechas de vencimiento."
        action={
          <button className="button button--primary" onClick={() => setModalOpen(true)}>
            <Plus size={18} /> Nueva inscripción
          </button>
        }
      />
      <section className="enrollment-summary">
        <article>
          <div className="summary-icon">
            <Users size={20} />
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
      <section className="panel data-panel">
        <div className="table-toolbar">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre del aprendiz..."
          />
          <div className="toolbar-actions">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filtrar estado"
            >
              <option>Todas</option>
              <option>Vigente</option>
              <option>Por vencer</option>
              <option>Vence hoy</option>
            </select>
            <FilterButton label="Más filtros" />
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Aprendiz</th>
                <th>Fecha de inicio</th>
                <th>Fecha de finalización</th>
                <th>Tiempo restante</th>
                <th>Estado</th>
                <th>
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="person-cell">
                      <div className="avatar avatar--soft">{item.iniciales}</div>
                      <div>
                        <strong>{item.nombre}</strong>
                        <small>Ficha {item.ficha}</small>
                      </div>
                    </div>
                  </td>
                  <td>{item.fechaInicio}</td>
                  <td>{item.fechaFin}</td>
                  <td>
                    <span className={item.tiempoRestante === "Hoy" ? "due-today" : ""}>
                      {item.tiempoRestante}
                    </span>
                  </td>
                  <td>
                    <InsigniaEstado estado={item.estado} />
                  </td>
                  <td>
                    <div className="row-actions">
                      {item.estado !== "Vigente" && (
                        <button className="renew-button">
                          <RefreshCw size={15} /> Renovar
                        </button>
                      )}
                      <button aria-label="Más opciones">
                        <MoreHorizontal size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>
            Mostrando {filtered.length} de {inscripciones.length} inscripciones
          </span>
          <div>
            <button disabled>Anterior</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Siguiente</button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <Modal
          title="Nueva inscripción"
          description="Asigna una nueva vigencia de acceso al gimnasio."
          onClose={() => setModalOpen(false)}
        >
          <form className="modal-form" onSubmit={createEnrollment}>
            <label className="form-field form-field--wide">
              <span>Aprendiz</span>
              <input
                required
                value={learner}
                onChange={(e) => setLearner(e.target.value)}
                placeholder="Buscar aprendiz por nombre o documento"
              />
            </label>
            <div className="form-grid">
              <label className="form-field">
                <span>Fecha de inicio</span>
                <input type="date" defaultValue="2025-05-20" required />
              </label>
              <label className="form-field">
                <span>Fecha de finalización</span>
                <input type="date" defaultValue="2025-08-20" required />
              </label>
              <label className="form-field form-field--wide">
                <span>Duración</span>
                <select defaultValue="3 meses">
                  <option>1 mes</option>
                  <option>3 meses</option>
                  <option>6 meses</option>
                  <option>12 meses</option>
                </select>
              </label>
            </div>
            <div className="checkin-info">
              <CalendarClock size={18} />
              <div>
                <span>Vigencia seleccionada</span>
                <strong>92 días de acceso al gimnasio</strong>
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setModalOpen(false)}
              >
                <X size={17} /> Cancelar
              </button>
              <button className="button button--primary" type="submit">
                Crear inscripción
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
