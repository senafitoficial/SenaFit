import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@senafit.edu.co");
  const [password, setPassword] = useState("SenaFit2025");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <Brand />
        <div className="login-visual__content">
          <span className="eyebrow-pill">
            <ShieldCheck size={15} /> Plataforma institucional
          </span>
          <h1>
            Bienestar que impulsa tu <em>formación.</em>
          </h1>
          <p>
            Gestiona el gimnasio, acompaña a los aprendices y fortalece una comunidad activa en el
            SENA.
          </p>
        </div>
        <div className="login-visual__stats">
          <div>
            <strong>1.248</strong>
            <span>Aprendices activos</span>
          </div>
          <div>
            <strong>92%</strong>
            <span>Ocupación este mes</span>
          </div>
          <div>
            <strong>+18%</strong>
            <span>Participación anual</span>
          </div>
        </div>
        <small className="login-visual__footer">SENA · Servicio Nacional de Aprendizaje</small>
      </section>

      <section className="login-form-wrap">
        <div className="login-mobile-brand">
          <Brand />
        </div>
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__heading">
            <span>ACCESO ADMINISTRATIVO</span>
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para acceder al sistema.</p>
          </div>
          <label className="form-field">
            <span>Correo electrónico</span>
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="form-field">
            <span>Contraseña</span>
            <div className="input-with-icon">
              <LockKeyhole size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" defaultChecked /> Recordarme
            </label>
            <button type="button">¿Olvidaste tu contraseña?</button>
          </div>
          <button className="button button--primary login-submit" type="submit">
            Ingresar al sistema <ArrowRight size={18} />
          </button>
          <p className="secure-note">
            <ShieldCheck size={16} /> Conexión segura y datos protegidos
          </p>
        </form>
      </section>
    </main>
  );
}
