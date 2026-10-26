import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { DashboardInicio } from './pages/DashboardInicio';
import { GestionObjetivosView } from './pages/GestionObjetivosView';
import { DashboardDGIyD } from './pages/DashboardDGIyD';
import { GeneracionObjetivos } from './pages/GeneracionObjetivos';
import { NuevoObjetivoWizard } from './pages/NuevoObjetivoWizard';
import { AsignacionPresupuestaria } from './pages/AsignacionPresupuestaria';
import { InformacionProyectos } from './pages/InformacionProyectos';
import { AdminUsuarios } from './pages/admin/AdminUsuarios';
import { AdminRoles } from './pages/admin/AdminRoles';
import { AdminFunciones } from './pages/admin/AdminFunciones';
import { DatosEstaticosPeriodos } from './pages/DatosEstaticosPeriodos';
import { Instructivo } from './pages/Instructivo';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardInicio />} />
          <Route path="/inicio" element={<DashboardInicio />} />
          <Route path="/datos-estaticos" element={<DatosEstaticosPeriodos />} />
          <Route path="/datos-estaticos/periodo" element={<DatosEstaticosPeriodos />} />
          <Route path="/datos-estaticos/periodos" element={<DatosEstaticosPeriodos />} />
          <Route path="/gestion-objetivos" element={<GestionObjetivosView />} />
          <Route path="/gestion-objetivos/:direccionId" element={<GestionObjetivosView />} />
          <Route path="/dashboard-dgiyd" element={<DashboardDGIyD />} />
          <Route path="/generacion-objetivos" element={<GeneracionObjetivos />} />
          <Route path="/generacion-objetivos/nuevo" element={<NuevoObjetivoWizard />} />
          <Route path="/asignacion-presupuestaria" element={<AsignacionPresupuestaria />} />
          <Route path="/proyectos" element={<InformacionProyectos />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/roles" element={<AdminRoles />} />
          <Route path="/admin/funciones" element={<AdminFunciones />} />
          <Route path="/instructivo" element={<Instructivo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
