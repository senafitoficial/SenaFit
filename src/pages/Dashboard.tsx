import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  ClipboardCheck,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "../components/PageUI";

const stats = [
  {
    label: "Aprendices activos",
    value: "1.248",
    change: "+8,4%",
    note: "vs. mes anterior",
    icon: Users,
  },
  {
    label: "Asistencias hoy",
    value: "186",
    change: "+12,1%",
    note: "42 en el gimnasio",
    icon: CalendarCheck,
  },
  {
    label: "Inscripciones vigentes",
    value: "934",
    change: "+5,2%",
    note: "74,8% del total",
    icon: ClipboardCheck,
  },
  {
    label: "Promedio de sesión",
    value: "54 min",
    change: "+3 min",
    note: "vs. mes anterior",
    icon: Clock3,
  },
];

const activities = [
  {
    initials: "VR",
    name: "Valentina Rodríguez",
    detail: "Registró entrada al gimnasio",
    time: "Hace 4 min",
    type: "Entrada",
  },
  {
    initials: "JM",
    name: "Juan David Martínez",
    detail: "Inscripción renovada por 3 meses",
    time: "Hace 18 min",
    type: "Renovación",
  },
  {
    initials: "LC",
    name: "Laura Sofía Castro",
    detail: "Actualizó sus datos personales",
    time: "Hace 36 min",
    type: "Actualización",
  },
  {
    initials: "SM",
    name: "Santiago Moreno",
    detail: "Registró salida · Sesión de 58 min",
    time: "Hace 52 min",
    type: "Salida",
  },
];

export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <h2>Buenos días, Camila</h2>
          <p>Este es el resumen del gimnasio para hoy, martes 20 de mayo.</p>
        </div>
        <Link className="button button--primary" to="/asistencias">
          <UserPlus size={17} /> Registrar asistencia
        </Link>
      </div>

      <section className="stats-grid" aria-label="Estadísticas principales">
        {stats.map(({ label, value, change, note, icon: Icon }) => (
          <article className="stat-card" key={label}>
            <div className="stat-card__top">
              <span>{label}</span>
              <div className="stat-icon">
                <Icon size={20} />
              </div>
            </div>
            <strong>{value}</strong>
            <div className="stat-card__meta">
              <span>
                <TrendingUp size={13} />
                {change}
              </span>{" "}
              {note}
            </div>
          </article>
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel__header">
            <div>
              <h3>Flujo de asistencias</h3>
              <p>Entradas registradas durante la última semana</p>
            </div>
            <select aria-label="Periodo del gráfico">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          <div className="bar-chart" aria-label="Gráfico de asistencias semanales">
            {[58, 72, 65, 88, 78, 48, 35].map((height, index) => (
              <div className="bar-column" key={index}>
                <div className="bar-value">
                  {index === 3 && <span>212</span>}
                  <i style={{ height: `${height}%` }} />
                </div>
                <small>{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][index]}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel capacity-panel">
          <div className="panel__header">
            <div>
              <h3>Ocupación actual</h3>
              <p>Capacidad del gimnasio en tiempo real</p>
            </div>
            <span className="live-label">
              <i /> En vivo
            </span>
          </div>
          <div className="capacity-meter">
            <div className="capacity-ring">
              <div>
                <strong>42</strong>
                <span>de 60</span>
              </div>
            </div>
            <div className="capacity-copy">
              <strong>70% de capacidad</strong>
              <p>Afluencia moderada</p>
            </div>
          </div>
          <div className="capacity-legend">
            <span>
              <i className="dot dot--green" /> En entrenamiento <b>42</b>
            </span>
            <span>
              <i className="dot dot--gray" /> Cupos disponibles <b>18</b>
            </span>
          </div>
        </section>

        <section className="panel activity-panel">
          <div className="panel__header">
            <div>
              <h3>Actividad reciente</h3>
              <p>Últimos movimientos registrados</p>
            </div>
            <Link to="/asistencias">
              Ver todo <ArrowRight size={15} />
            </Link>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-item" key={`${activity.name}-${activity.time}`}>
                <div className="avatar avatar--soft">{activity.initials}</div>
                <div className="activity-copy">
                  <strong>{activity.name}</strong>
                  <span>{activity.detail}</span>
                </div>
                <StatusBadge status={activity.type} />
                <time>{activity.time}</time>
              </div>
            ))}
          </div>
        </section>

        <section className="panel expires-panel">
          <div className="panel__header">
            <div>
              <h3>Próximos vencimientos</h3>
              <p>Inscripciones que requieren atención</p>
            </div>
            <Link to="/inscripciones">
              Gestionar <ArrowRight size={15} />
            </Link>
          </div>
          {[
            ["Ana María Gómez", "Hoy", "AM"],
            ["Nicolás Vargas", "22 may", "NV"],
            ["Daniela Sánchez", "24 may", "DS"],
          ].map(([name, date, initials]) => (
            <div className="expiry-row" key={name}>
              <div className="avatar avatar--soft">{initials}</div>
              <div>
                <strong>{name}</strong>
                <span>Ficha 2678341</span>
              </div>
              <time>{date}</time>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
