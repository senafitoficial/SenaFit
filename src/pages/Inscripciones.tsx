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
import { FilterButton, PageIntro, SearchField, StatusBadge } from "../components/PageUI";

type Enrollment = {
  id: number;
  name: string;
  initials: string;
  ficha: string;
  start: string;
  end: string;
  status: string;
  remaining: string;
};
const initialEnrollments: Enrollment[] = [
  {
    id: 1,
    name: "Valentina Rodríguez",
    initials: "VR",
    ficha: "2678341",
    start: "12 feb 2025",
    end: "12 ago 2025",
    status: "Vigente",
    remaining: "84 días",
  },
  {
    id: 2,
    name: "Mateo Hernández",
    initials: "MH",
    ficha: "2691054",
    start: "05 mar 2025",
    end: "05 jun 2025",
    status: "Por vencer",
    remaining: "16 días",
  },
  {
    id: 3,
    name: "Laura Sofía Castro",
    initials: "LC",
    ficha: "2679012",
    start: "18 ene 2025",
    end: "18 jul 2025",
    status: "Vigente",
    remaining: "59 días",
  },
  {
    id: 4,
    name: "Ana María Gómez",
    initials: "AG",
    ficha: "2684450",
    start: "20 feb 2025",
    end: "20 may 2025",
    status: "Vence hoy",
    remaining: "Hoy",
  },
  {
    id: 5,
    name: "Nicolás Vargas",
    initials: "NV",
    ficha: "2692108",
    start: "22 feb 2025",
    end: "22 may 2025",
    status: "Por vencer",
    remaining: "2 días",
  },
];

export function Inscripciones() {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [learner, setLearner] = useState("");
  const filtered = useMemo(
    () =>
      enrollments.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "Todas" || item.status === filter),
      ),
    [enrollments, search, filter],
  );

  function createEnrollment(event: FormEvent) {
    event.preventDefault();
    const name = learner || "Juan Felipe Torres";
    const initials = name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    setEnrollments([
      {
        id: Date.now(),
        name,
        initials,
        ficha: "2701184",
        start: "20 may 2025",
        end: "20 ago 2025",
        status: "Vigente",
        remaining: "92 días",
      },
      ...enrollments,
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
                      <div className="avatar avatar--soft">{item.initials}</div>
                      <div>
                        <strong>{item.name}</strong>
                        <small>Ficha {item.ficha}</small>
                      </div>
                    </div>
                  </td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>
                    <span className={item.remaining === "Hoy" ? "due-today" : ""}>
                      {item.remaining}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <div className="row-actions">
                      {item.status !== "Vigente" && (
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
            Mostrando {filtered.length} de {enrollments.length} inscripciones
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
