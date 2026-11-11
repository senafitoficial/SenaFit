import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Aprendices } from "./pages/Aprendices";
import { Asistencias } from "./pages/Asistencias";
import { Dashboard } from "./pages/Dashboard";
import { Inscripciones } from "./pages/Inscripciones";
import { Login } from "./pages/Login";
import "./styles/app.css";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aprendices" element={<Aprendices />} />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/inscripciones" element={<Inscripciones />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
