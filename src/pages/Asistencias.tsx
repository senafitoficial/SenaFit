import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  LogIn,
  Plus,
  Timer,
  X,
} from "lucide-react";
import { Modal } from "../components/Modal";
import { FilterButton, PageIntro, SearchField, StatusBadge } from "../components/PageUI";

type Attendance = {
  id: number;
  name: string;
  initials: string;
  document: string;
  date: string;
  entry: string;
  exit: string;
  duration: string;
  status: string;
};
const initialRecords: Attendance[] = [
  {
    id: 1,
    name: "Valentina Rodríguez",
    initials: "VR",
    document: "1.014.287.392",
    date: "20 may 2025",
    entry: "06:42",
    exit: "—",
    duration: "En curso",
    status: "En gimnasio",
  },
  {
    id: 2,
    name: "Mateo Hernández",
    initials: "MH",
    document: "1.002.845.127",
    date: "20 may 2025",
    entry: "07:08",
    exit: "08:16",
    duration: "1 h 08 min",
    status: "Finalizada",
  },
  {
    id: 3,
    name: "Laura Sofía Castro",
    initials: "LC",
    document: "1.023.671.455",
    date: "20 may 2025",
    entry: "07:21",
    exit: "08:15",
    duration: "54 min",
    status: "Finalizada",
  },
  {
    id: 4,
    name: "Mariana López",
    initials: "ML",
    document: "1.008.993.214",
    date: "20 may 2025",
    entry: "08:04",
    exit: "—",
    duration: "En curso",
    status: "En gimnasio",
  },
  {
    id: 5,
    name: "Andrés Ramírez",
    initials: "AR",
    document: "1.010.552.321",
    date: "19 may 2025",
    entry: "17:32",
    exit: "18:41",
    duration: "1 h 09 min",
    status: "Finalizada",
  },
];

export function Asistencias() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [document, setDocument] = useState("");
  const filtered = useMemo(
    () =>
      records.filter((record) =>
        `${record.name} ${record.document}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [records, search],
  );

  function register(event: FormEvent) {
    event.preventDefault();
    setRecords([
      {
        id: Date.now(),
        name: "Carlos Andrés Pérez",
        initials: "CP",
        document,
        date: "20 may 2025",
        entry: "09:34",
        exit: "—",
        duration: "En curso",
        status: "En gimnasio",
      },
      ...records,
    ]);
    setModalOpen(false);
    setDocument("");
  }

  function checkout(id: number) {
    setRecords(
      records.map((record) =>
        record.id === id
          ? { ...record, exit: "10:28", duration: "1 h 02 min", status: "Finalizada" }
          : record,
      ),
    );
  }

  return (
    <>
      <PageIntro
        title="Control de asistencias"
        description="Registra y consulta las entradas y salidas del gimnasio."
        action={
          <button className="button button--primary" onClick={() => setModalOpen(true)}>
            <Plus size={18} /> Registrar entrada
          </button>
        }
      />
      <section className="attendance-summary">
        <article>
          <div className="summary-icon">
            <LogIn size={20} />
          </div>
          <div>
            <span>Entradas hoy</span>
            <strong>186</strong>
            <small>
              <b>+12%</b> frente a ayer
            </small>
          </div>
        </article>
        <article>
          <div className="summary-icon">
            <Clock3 size={20} />
          </div>
          <div>
            <span>En el gimnasio</span>
            <strong>42</strong>
            <small>De 60 cupos disponibles</small>
          </div>
        </article>
        <article>
          <div className="summary-icon">
            <Timer size={20} />
          </div>
          <div>
            <span>Tiempo promedio</span>
            <strong>54 min</strong>
            <small>Sesión de entrenamiento</small>
          </div>
        </article>
        <article>
          <div className="summary-icon">
            <CalendarDays size={20} />
          </div>
          <div>
            <span>Fecha consultada</span>
            <strong className="summary-date">20 may 2025</strong>
            <small>Martes</small>
          </div>
        </article>
      </section>
      <section className="panel data-panel">
        <div className="table-toolbar">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar aprendiz o documento..."
          />
          <div className="toolbar-actions">
            <input className="date-input" type="date" defaultValue="2025-05-20" />
            <FilterButton />
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Aprendiz</th>
                <th>Fecha</th>
                <th>Hora entrada</th>
                <th>Hora salida</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="person-cell">
                      <div className="avatar avatar--soft">{record.initials}</div>
                      <div>
                        <strong>{record.name}</strong>
                        <small>{record.document}</small>
                      </div>
                    </div>
                  </td>
                  <td>{record.date}</td>
                  <td>
                    <span className="time-cell time-cell--in">
                      <ArrowDownRight size={15} />
                      {record.entry}
                    </span>
                  </td>
                  <td>
                    {record.exit === "—" ? (
                      "—"
                    ) : (
                      <span className="time-cell">
                        <ArrowUpRight size={15} />
                        {record.exit}
                      </span>
                    )}
                  </td>
                  <td>{record.duration}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    {record.status === "En gimnasio" ? (
                      <button className="text-button" onClick={() => checkout(record.id)}>
                        Registrar salida
                      </button>
                    ) : (
                      <span className="muted">Completado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Mostrando {filtered.length} registros</span>
          <div>
            <button disabled>Anterior</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Siguiente</button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <Modal
          title="Registrar entrada"
          description="Busca al aprendiz por su número de documento."
          onClose={() => setModalOpen(false)}
        >
          <form className="modal-form" onSubmit={register}>
            <label className="form-field">
              <span>Documento del aprendiz</span>
              <input
                autoFocus
                required
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder="Ej. 1.024.568.921"
              />
            </label>
            <div className="found-user">
              <div className="avatar avatar--soft">CP</div>
              <div>
                <small>Aprendiz encontrado</small>
                <strong>Carlos Andrés Pérez</strong>
                <span>Ficha 2678341 · Estado activo</span>
              </div>
            </div>
            <div className="checkin-info">
              <CalendarDays size={18} />
              <div>
                <span>Fecha y hora de entrada</span>
                <strong>20 de mayo de 2025 · 09:34 a. m.</strong>
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
                <LogIn size={17} /> Confirmar entrada
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
