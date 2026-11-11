import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Users,
  X,
} from "lucide-react";
import { Brand } from "./Brand";

const navItems = [
  { to: "/dashboard", label: "Panel general", icon: LayoutDashboard },
  { to: "/aprendices", label: "Aprendices", icon: Users },
  { to: "/asistencias", label: "Asistencias", icon: CalendarCheck },
  { to: "/inscripciones", label: "Inscripciones", icon: ClipboardList },
];

const pageTitles: Record<string, { title: string; eyebrow: string }> = {
  "/dashboard": { title: "Panel general", eyebrow: "Resumen operativo" },
  "/aprendices": { title: "Aprendices", eyebrow: "Gestión de usuarios" },
  "/asistencias": { title: "Asistencias", eyebrow: "Control de acceso" },
  "/inscripciones": { title: "Inscripciones", eyebrow: "Membresías y vigencias" },
};

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const current = pageTitles[location.pathname] ?? pageTitles["/dashboard"];

  return (
    <div className="app-shell">
      {menuOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__top">
          <Brand />
          <button
            className="icon-button sidebar__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar__facility">
          <div className="facility-icon">
            <Dumbbell size={20} />
          </div>
          <div>
            <small>Sede activa</small>
            <strong>Centro de Servicios</strong>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Navegación principal">
          <span className="nav-label">Administración</span>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? "nav-item--active" : ""}`}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__profile">
          <div className="avatar">CM</div>
          <div className="profile-copy">
            <strong>Camila Muñoz</strong>
            <small>Administradora</small>
          </div>
          <button
            className="icon-button"
            onClick={() => navigate("/login")}
            aria-label="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
          <div className="topbar__title">
            <span>{current.eyebrow}</span>
            <h1>{current.title}</h1>
          </div>
          <div className="topbar__actions">
            <label className="quick-search">
              <Search size={17} />
              <input aria-label="Búsqueda rápida" placeholder="Búsqueda rápida..." />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" aria-label="Notificaciones">
              <Bell size={20} />
              <span />
            </button>
            <button className="profile-button" aria-label="Abrir perfil">
              <div className="avatar avatar--small">CM</div>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main className="page-content" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
