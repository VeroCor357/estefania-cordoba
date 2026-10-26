import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Folder,
  Target,
  PlusCircle,
  Settings,
  BookOpen,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Calendar,
  User,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export const DIRECCIONES_LIST = [
  { id: 'dir-grl-inves-dllo', label: 'Dir Grl Inves Dllo', fullName: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO' },
  { id: 'dir-grl-org-doct', label: 'Dir Grl Org Doct', fullName: 'DIRECCIÓN GENERAL DE ORGANIZACIÓN Y DOCTRINA' },
  { id: 'dir-grl-mat', label: 'Dir Grl Mat', fullName: 'DIRECCIÓN GENERAL DE MATERIAL' },
  { id: 'dir-grl-com-info', label: 'Dir Grl Com Info y Ciberdefensa', fullName: 'DIRECCIÓN GENERAL DE COMUNICACIONES E INFORMÁTICA Y CIBERDEFENSA' },
  { id: 'dir-grl-icia', label: 'Dir Grl Icia', fullName: 'DIRECCIÓN GENERAL DE INTELIGENCIA' },
  { id: 'dir-av-ej', label: 'Dir Av Ej', fullName: 'DIRECCIÓN DE AVIACIÓN DE EJÉRCITO' },
  { id: 'dir-cont-fin', label: 'Dir Cont Fin', fullName: 'DIRECCIÓN DE CONTADURÍA Y FINANZAS' },
  { id: 'dir-grl-sal', label: 'Dir Grl Sal', fullName: 'DIRECCIÓN GENERAL DE SALUD' },
  { id: 'dir-grl-pers-bien', label: 'Dir Grl Pers Bien', fullName: 'DIRECCIÓN GENERAL DE PERSONAL Y BIENESTAR' },
  { id: 'dir-grl-ing-infr', label: 'Dir Grl Ing e Infr', fullName: 'DIRECCIÓN GENERAL DE INGENIEROS E INFRAESTRUCTURA' },
  { id: 'dir-rem-vet', label: 'Dir Rem Vet', fullName: 'DIRECCIÓN DE REMONTA Y VETERINARIA' },
  { id: 'cu-grl-emge', label: 'Cu Grl-EMGE', fullName: 'CUARTEL GENERAL DEL ESTADO MAYOR GENERAL DEL EJÉRCITO' },
  { id: 'dahe', label: 'DAHE', fullName: 'DIRECCIÓN DE ASUNTOS HISTÓRICOS DEL EJÉRCITO' },
  { id: 'cdo-guar-mil-bs-as', label: 'Comando Guar Mil Bs As', fullName: 'COMANDO DE LA GUARNICIÓN MILITAR BUENOS AIRES' },
  { id: 'dir-ars', label: 'Dir Ars', fullName: 'DIRECCIÓN DE ARSENALES' },
  { id: 'dir-int', label: 'Dir Int', fullName: 'DIRECCIÓN DE INTENDENCIA' },
  { id: 'dir-transp', label: 'Dir Transp', fullName: 'DIRECCIÓN DE TRANSPORTE' },
];

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gestionOpen, setGestionOpen] = useState(true);
  const [datosEstaticosOpen, setDatosEstaticosOpen] = useState(false);
  const [generacionOpen, setGeneracionOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggedOutToast, setLoggedOutToast] = useState(false);

  // Active direccion from URL query or path
  const currentPath = location.pathname;
  const isInicio = currentPath === '/' || currentPath === '/inicio';
  const isGestion = currentPath.startsWith('/gestion-objetivos');
  const isDatosEstaticos = currentPath.startsWith('/datos-estaticos');
  const isGeneracion = currentPath.startsWith('/generacion-objetivos') || currentPath === '/asignacion-presupuestaria' || currentPath === '/proyectos';
  const isAdministracion = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#f1f4f6] flex flex-col font-sans text-gray-900 select-none">
      {/* Barra Superior Institucional (Header estilo captura) */}
      <header className="h-13 bg-[#061e12] text-white flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0 shadow-sm border-b border-[#0a2e1c]">
        {/* Logo Institucional Izquierda */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-1 rounded focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer group"
          >
            <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase">
              SCGEA
            </span>
          </div>
        </div>

        {/* Info Derecha: Año Operativo y Usuario */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-gray-300 font-medium">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Año Operativo 2026</span>
          </div>

          {/* User Oval Pill como en la captura */}
          <div className="flex items-center gap-2 bg-[#092b1a] border border-emerald-600/40 rounded-full py-1 px-3 shadow-xs">
            <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-emerald-200">
              <User className="w-3 h-3" />
            </div>
            <span className="text-xs text-gray-100 font-bold hidden sm:inline">
              Estefania Verónica CORDOBA
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold pl-1 border-l border-emerald-700/50">
              Rol: Admin
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Lateral Verde Oscuro Institucional */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#051c11] text-white flex flex-col justify-between shadow-2xl transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="py-3 px-3">
            {/* Header Menú Principal */}
            <div className="px-3 py-2 text-[10px] font-extrabold text-emerald-400/90 uppercase tracking-widest">
              MENÚ PRINCIPAL
            </div>

            <nav className="mt-1 flex flex-col space-y-1">
              {/* 1. Inicio */}
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#00a86b] text-white shadow-sm'
                      : 'text-gray-300 hover:bg-[#0c2f1e] hover:text-white'
                  }`
                }
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Inicio</span>
              </NavLink>

              {/* 2. Datos Estáticos */}
              <div>
                <button
                  type="button"
                  onClick={() => setDatosEstaticosOpen(!datosEstaticosOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    isDatosEstaticos
                      ? 'text-emerald-300 bg-[#092b1b]'
                      : 'text-gray-300 hover:bg-[#0c2f1e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Datos Estáticos</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      datosEstaticosOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {datosEstaticosOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l border-emerald-800/40 space-y-0.5">
                    <NavLink
                      to="/datos-estaticos/periodo"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive || location.pathname.startsWith('/datos-estaticos')
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-red-400 bg-transparent shrink-0" />
                      <span>Período</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 3. Gestión de Objetivos (con las 17 Direcciones) */}
              <div>
                <button
                  type="button"
                  onClick={() => setGestionOpen(!gestionOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    isGestion
                      ? 'text-emerald-300 bg-[#092b1b]'
                      : 'text-gray-300 hover:bg-[#0c2f1e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gestión de Objetivos</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      gestionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {gestionOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l border-emerald-800/40 space-y-0.5">
                    {DIRECCIONES_LIST.map((dir) => {
                      const isActive =
                        location.pathname === `/gestion-objetivos/${dir.id}` ||
                        (location.pathname === '/gestion-objetivos' && dir.id === 'dir-grl-inves-dllo');

                      return (
                        <NavLink
                          key={dir.id}
                          to={`/gestion-objetivos/${dir.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                            isActive
                              ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                              : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isActive ? 'bg-emerald-300' : 'bg-gray-500'
                            }`}
                          />
                          <span className="truncate">{dir.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Generación de Objetivos */}
              <div>
                <button
                  type="button"
                  onClick={() => setGeneracionOpen(!generacionOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    isGeneracion
                      ? 'text-emerald-300 bg-[#092b1b]'
                      : 'text-gray-300 hover:bg-[#0c2f1e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <PlusCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Generación de Objetivos</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      generacionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {generacionOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l border-emerald-800/40 space-y-0.5">
                    <NavLink
                      to="/generacion-objetivos"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-transparent shrink-0" />
                      <span>Generación de Objetivos</span>
                    </NavLink>
                    <NavLink
                      to="/asignacion-presupuestaria"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-transparent shrink-0" />
                      <span>Asignación Presupuestaria</span>
                    </NavLink>
                    <NavLink
                      to="/proyectos"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-transparent shrink-0" />
                      <span>Información de Proyectos</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 5. Administración Sistema */}
              <div>
                <button
                  type="button"
                  onClick={() => setAdminOpen(!adminOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    isAdministracion
                      ? 'text-emerald-300 bg-[#092b1b]'
                      : 'text-gray-300 hover:bg-[#0c2f1e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Administración Sistema</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      adminOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {adminOpen && (
                  <div className="mt-1 ml-4 pl-3 border-l border-emerald-800/40 space-y-0.5">
                    <NavLink
                      to="/admin/usuarios"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-transparent shrink-0" />
                      <span>Usuarios</span>
                    </NavLink>
                    <NavLink
                      to="/admin/roles"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-transparent shrink-0" />
                      <span>Roles</span>
                    </NavLink>
                    <NavLink
                      to="/admin/funciones"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2.5 py-1.5 rounded text-[11px] font-medium transition ${
                          isActive
                            ? 'bg-[#0e5c38] text-white font-bold shadow-xs'
                            : 'text-gray-300 hover:text-white hover:bg-[#0c2f1e]'
                        }`
                      }
                    >
                      <span className="w-2 h-2 rounded-full border border-amber-400 bg-transparent shrink-0" />
                      <span>Funciones</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 6. Instructivo */}
              <NavLink
                to="/instructivo"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#00a86b] text-white'
                      : 'text-gray-300 hover:bg-[#0c2f1e] hover:text-white'
                  }`
                }
              >
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instructivo</span>
              </NavLink>

              {/* 7. Cerrar Sesión (inmediatamente debajo de Instructivo) */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogoutModal(true);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-300 hover:bg-[#0c2f1e] hover:text-white transition text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </div>

          {/* Imagen Oficial del Ejército Argentino en la base */}
          <div className="p-4 border-t border-[#092b1a] bg-[#04160d] flex flex-col items-center justify-center">
            <img
              src="/assets/aistudio/image_fa8d1654.png"
              alt="Escudo Oficial del Ejército Argentino"
              className="w-28 h-28 object-contain rounded-full shadow-lg"
            />
          </div>
        </aside>

        {/* Contenido Principal Dinámico */}
        <main className="flex-1 overflow-y-auto max-w-full p-4 sm:p-6 lg:p-7 flex flex-col justify-between">
          <div>{children}</div>

          {/* Footer Institucional */}
          <footer className="mt-8 py-3 text-right text-[11px] font-bold text-gray-700 tracking-wider">
            EJÉRCITO ARGENTINO - CENTRO DE PRODUCCIÓN DE SOFTWARE
          </footer>
        </main>
      </div>

      {/* Modal de Confirmación Cerrar Sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <LogOut className="w-5 h-5" />
              <h3 className="text-base font-bold text-gray-900">Cerrar Sesión</h3>
            </div>
            <p className="text-xs text-gray-600 mb-6">
              ¿Está seguro de que desea salir del Sistema de Control de Gestión del Ejército Argentino (SCGEA)?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  setLoggedOutToast(true);
                  setTimeout(() => setLoggedOutToast(false), 3000);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition cursor-pointer shadow-xs"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {loggedOutToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#061e12] text-white px-4 py-2.5 rounded-lg shadow-lg border border-emerald-500/30 flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Sesión cerrada correctamente.
        </div>
      )}
    </div>
  );
};
