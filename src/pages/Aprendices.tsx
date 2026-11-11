import { useMemo, useState, type FormEvent } from "react";
import { Download, MoreHorizontal, Pencil, Plus, UserRound, X } from "lucide-react";
import { Modal } from "../components/Modal";
import { FilterButton, PageIntro, SearchField, StatusBadge } from "../components/PageUI";
import { initialLearners, type Learner } from "../data";

const emptyForm = {
  nombre: "",
  document: "",
  ficha: "",
  centro: "Servicios Financieros",
  estado: "Activo" as Learner["status"],
  discapacidad: "Ninguna",
};

export function Aprendices() {
  const [learners, setLearners] = useState(initialLearners);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [editing, setEditing] = useState<Learner | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(
    () =>
      learners.filter((learner) => {
        const matchesSearch = `${learner.name} ${learner.document} ${learner.ficha}`
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesSearch && (status === "Todos" || learner.status === status);
      }),
    [learners, search, status],
  );

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(learner: Learner) {
    setEditing(learner);
    setForm({
      nombre: learner.name,
      document: learner.document,
      ficha: learner.ficha,
      centro: learner.center,
      estado: learner.status,
      discapacidad: learner.disability,
    });
    setModalOpen(true);
  }

  function saveLearner(event: FormEvent) {
    event.preventDefault();
    const initials = form.nombre
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase();
    const learnerData = {
      name: form.nombre,
      document: form.document,
      ficha: form.ficha,
      center: form.centro,
      status: form.estado,
      disability: form.discapacidad,
      initials,
    };

    if (editing) {
      setLearners(
        learners.map((item) =>
          item.id === editing.id ? { ...item, ...learnerData } : item,
        ),
      );
    } else {
      setLearners([{ id: Date.now(), ...learnerData }, ...learners]);
    }
    setModalOpen(false);
  }

  return (
    <>
      <PageIntro
        title="Gestión de aprendices"
        description="Administra la información y el estado de los aprendices registrados."
        action={
          <button className="button button--primary" onClick={openCreate}>
            <Plus size={18} /> Nuevo aprendiz
          </button>
        }
      />
      <section className="panel data-panel">
        <div className="table-toolbar">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre, documento o ficha..."
          />
          <div className="toolbar-actions">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filtrar por estado"
            >
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
            <FilterButton />
            <button className="button button--secondary">
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
              {filtered.map((learner) => (
                <tr key={learner.id}>
                  <td>
                    <div className="person-cell">
                      <div className="avatar avatar--soft">{learner.initials}</div>
                      <div>
                        <strong>{learner.name}</strong>
                        <small>aprendiz@sena.edu.co</small>
                      </div>
                    </div>
                  </td>
                  <td>{learner.document}</td>
                  <td>
                    <span className="code-pill">{learner.ficha}</span>
                  </td>
                  <td>{learner.center}</td>
                  <td>
                    <StatusBadge status={learner.status} />
                  </td>
                  <td>{learner.disability}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        onClick={() => openEdit(learner)}
                        aria-label={`Editar a ${learner.name}`}
                      >
                        <Pencil size={17} />
                      </button>
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
            Mostrando {filtered.length} de {learners.length} aprendices
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
          title={editing ? "Editar aprendiz" : "Registrar aprendiz"}
          description="Completa la información personal y académica."
          onClose={() => setModalOpen(false)}
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
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej. María Rodríguez"
                />
              </label>
              <label className="form-field">
                <span>Documento</span>
                <input
                  required
                  value={form.document}
                  onChange={(e) => setForm({ ...form, document: e.target.value })}
                  placeholder="Número de documento"
                />
              </label>
              <label className="form-field">
                <span>Número de ficha</span>
                <input
                  required
                  value={form.ficha}
                  onChange={(e) => setForm({ ...form, ficha: e.target.value })}
                  placeholder="Ej. 2678341"
                />
              </label>
              <label className="form-field form-field--wide">
                <span>Centro de formación</span>
                <select
                  value={form.centro}
                  onChange={(e) => setForm({ ...form, centro: e.target.value })}
                >
                  <option>Centro de Automatización Industrial</option>
                  <option>Centro de Comercio y Servicios</option>
                  <option>Centro de Procesos Industriales y Construcción</option>
                  <option>Centro para la Formación Cafetera </option>
                  <option>Centro Pecuario y Agroempresarial</option>
                  
                </select>
              </label>
              <label className="form-field">
                <span>Estado</span>
                <select
                  value={form.estado}
                  onChange={(e) =>
                    setForm({ ...form, estado: e.target.value as Learner["status"] })
                  }
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </label>
              <label className="form-field">
                <span>Discapacidad</span>
                <input
                  required
                  value={form.discapacidad}
                  onChange={(e) => setForm({ ...form, discapacidad: e.target.value })}
                  placeholder="Describa la discapacidad o 'Ninguna'"
                />
              </label>
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
                {editing ? "Guardar cambios" : "Registrar aprendiz"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
