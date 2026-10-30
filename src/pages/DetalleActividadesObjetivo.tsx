import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Plus, SquarePen, Trash2, X } from 'lucide-react';
import { mockObjetivosListado, ObjetivoFila } from './GeneracionObjetivos';

export interface AccionActividad {
  id: number;
  nombre: string;
  presupuestoActual: string;
  presupuestoTotal: string;
  porcentajeActual: string;
  porcentajeTotal: string;
  completado: boolean;
}

const defaultAcciones: AccionActividad[] = [
  {
    id: 1,
    nombre: 'Adquisición de Equipamiento Biomédico 1er Trimestre',
    presupuestoActual: '$ 615.000.000,00',
    presupuestoTotal: '$ 615.000.000,00',
    porcentajeActual: '72,00 %',
    porcentajeTotal: '72,00 %',
    completado: true,
  },
  {
    id: 2,
    nombre: 'Adquisición de Equipamiento Biomédico 2do Trimestre',
    presupuestoActual: '$ 0,00',
    presupuestoTotal: '$ 235.000.000,00',
    porcentajeActual: '0,00 %',
    porcentajeTotal: '28,00 %',
    completado: true,
  },
];

export const DetalleActividadesObjetivo: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Buscar el objetivo correspondiente o usar el default de la captura
  const objetivo = useMemo<ObjetivoFila>(() => {
    if (id) {
      const found = mockObjetivosListado.find((o) => o.id === Number(id));
      if (found) return found;
    }
    return (
      mockObjetivosListado[0] || {
        id: 1,
        ordenPrioridad: 0,
        nombre: 'Reposición de Equipamiento Biomédico (Inciso 4)',
        direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
        progreso: 72,
        fechaDesde: '01/01/2026',
        fechaHasta: '31/12/2026',
        descripcion:
          'Adquisición de Desfibrilador Externo Automático (DEA) y Sillones Odontológicos',
      }
    );
  }, [id]);

  const [acciones, setAcciones] = useState<AccionActividad[]>(defaultAcciones);
  const [modalNuevaAccion, setModalNuevaAccion] = useState(false);
  const [nuevaAccion, setNuevaAccion] = useState({
    nombre: '',
    presupuestoActual: '$ 0,00',
    presupuestoTotal: '$ 0,00',
    porcentajeActual: '0,00 %',
    porcentajeTotal: '0,00 %',
  });

  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const toggleCompletado = (accionId: number) => {
    setAcciones((prev) =>
      prev.map((acc) =>
        acc.id === accionId ? { ...acc, completado: !acc.completado } : acc
      )
    );
  };

  const handleAgregarAccion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaAccion.nombre.trim()) return;

    const nueva: AccionActividad = {
      id: Date.now(),
      nombre: nuevaAccion.nombre,
      presupuestoActual: nuevaAccion.presupuestoActual,
      presupuestoTotal: nuevaAccion.presupuestoTotal,
      porcentajeActual: nuevaAccion.porcentajeActual,
      porcentajeTotal: nuevaAccion.porcentajeTotal,
      completado: true,
    };

    setAcciones((prev) => [...prev, nueva]);
    setModalNuevaAccion(false);
    setNuevaAccion({
      nombre: '',
      presupuestoActual: '$ 0,00',
      presupuestoTotal: '$ 0,00',
      porcentajeActual: '0,00 %',
      porcentajeTotal: '0,00 %',
    });
    mostrarToast('Acción agregada correctamente');
  };

  const mostrarToast = (msg: string) => {
    setMensajeExito(msg);
    setTimeout(() => setMensajeExito(null), 3000);
  };

  // Porcentaje general calculado
  const completadoValor = objetivo.progreso || 72;

  return (
    <div className="space-y-4">
      {/* Toast de confirmación */}
      {mensajeExito && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-sm font-medium transition animate-fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{mensajeExito}</span>
        </div>
      )}

      {/* 1. Header estilo captura: ← DIRECCIÓN GENERAL DE SALUD */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate('/generacion-objetivos')}
          className="text-[#00a8e8] hover:text-[#008dbf] flex items-center gap-2 cursor-pointer transition group"
          title="Volver a Objetivos"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3] group-hover:-translate-x-0.5 transition-transform" />
          <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
            {objetivo.direccionCargo || 'DIRECCIÓN GENERAL DE SALUD'}
          </h1>
        </button>
      </div>

      {/* 2. Contenedor principal con solapa de Actividades */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden">
        {/* Barra superior de pestañas con línea azul superior */}
        <div className="border-b border-gray-200 px-4 pt-3 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="px-5 py-2.5 bg-white border-t-2 border-t-[#00a8e8] border-x border-b-0 border-gray-200 text-sm font-semibold text-[#1e293b] rounded-t-sm shadow-2xs">
              Actividades
            </div>
          </div>

          <button
            onClick={() => setModalNuevaAccion(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00a8e8] hover:bg-[#0096d1] text-white text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nueva Acción</span>
          </button>
        </div>

        {/* Sección de detalles del objetivo */}
        <div className="p-6 sm:p-8 space-y-3">
          {/* Nombre */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm font-bold text-[#1e293b] min-w-[90px]">
              Nombre:
            </span>
            <span className="text-sm text-gray-800 font-normal">
              {objetivo.nombre || 'Reposición de Equipamiento Biomédico (Inciso 4)'}
            </span>
          </div>

          {/* Descripción */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm font-bold text-[#1e293b] min-w-[90px]">
              Descripción:
            </span>
            <span className="text-sm text-gray-800 font-normal">
              {objetivo.descripcion ||
                'Adquisición de Desfibrilador Externo Automático (DEA) y Sillones Odontológicos'}
            </span>
          </div>

          {/* Completado + Barra */}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-4 min-w-[170px]">
              <span className="text-sm font-bold text-[#1e293b]">Completado:</span>
              <span className="text-sm font-bold text-[#1e293b]">
                {completadoValor.toFixed(2).replace('.', ',')}%
              </span>
            </div>

            {/* Barra de progreso amplia */}
            <div className="flex-1 bg-gray-100 rounded-sm h-4 overflow-hidden border border-gray-200">
              <div
                className="bg-[#28a745] h-full transition-all duration-500 rounded-xs"
                style={{ width: `${Math.min(100, Math.max(0, completadoValor))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Separador oscuro grueso estilo captura */}
        <div className="border-t-2 border-[#1e293b] mx-4 sm:mx-8" />

        {/* 3. Sección Acciones */}
        <div className="p-6 sm:p-8 pt-6">
          {/* Título centrado Acciones */}
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#1e293b]">
              Acciones
            </h2>
          </div>

          {/* Tabla de Acciones */}
          <div className="overflow-x-auto border border-gray-200 rounded-sm shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#e9ecef] border-b border-gray-300 text-gray-800 font-bold">
                  <th className="px-4 sm:px-6 py-3 font-bold text-gray-900 w-1/3">
                    Nombre
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold text-gray-900 text-center">
                    Presupuesto
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold text-gray-900 text-center">
                    %
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-bold text-gray-900 text-center w-28">
                    Completado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {acciones.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Nombre */}
                    <td className="px-4 sm:px-6 py-4 text-gray-800 font-normal">
                      {acc.nombre}
                    </td>

                    {/* Presupuesto: $ 615.000.000,00 de $ 615.000.000,00 */}
                    <td className="px-4 sm:px-6 py-4 text-center text-gray-800 font-bold whitespace-nowrap">
                      <span>{acc.presupuestoActual}</span>{' '}
                      <span className="text-gray-600 font-normal">de</span>{' '}
                      <span>{acc.presupuestoTotal}</span>
                    </td>

                    {/* %: [72,00 %] de [72,00 %] */}
                    <td className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#28a745] text-white text-xs font-bold shadow-2xs">
                          {acc.porcentajeActual}
                        </span>
                        <span className="text-gray-700 text-xs font-normal">
                          de
                        </span>
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#28a745] text-white text-xs font-bold shadow-2xs">
                          {acc.porcentajeTotal}
                        </span>
                      </div>
                    </td>

                    {/* Completado: Botón verde con tilde check */}
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <button
                        onClick={() => toggleCompletado(acc.id)}
                        title={
                          acc.completado
                            ? 'Completado (Click para alternar)'
                            : 'Pendiente (Click para marcar completado)'
                        }
                        className={`w-6 h-6 rounded inline-flex items-center justify-center transition shadow-2xs cursor-pointer ${
                          acc.completado
                            ? 'bg-[#28a745] hover:bg-[#218838] text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-500'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botón flotante móvil para agregar acción */}
          <div className="mt-4 flex sm:hidden justify-end">
            <button
              onClick={() => setModalNuevaAccion(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00a8e8] hover:bg-[#0096d1] text-white text-xs font-semibold shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Acción</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal para agregar nueva acción */}
      {modalNuevaAccion && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg border border-gray-200 overflow-hidden animate-scale-in">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-800 text-sm">
                Nueva Acción para Actividades
              </h3>
              <button
                onClick={() => setModalNuevaAccion(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAgregarAccion} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nombre de la Acción *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Adquisición de Equipamiento Biomédico 3er Trimestre"
                  value={nuevaAccion.nombre}
                  onChange={(e) =>
                    setNuevaAccion({ ...nuevaAccion, nombre: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Presupuesto Ejecutado
                  </label>
                  <input
                    type="text"
                    value={nuevaAccion.presupuestoActual}
                    onChange={(e) =>
                      setNuevaAccion({
                        ...nuevaAccion,
                        presupuestoActual: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Presupuesto Asignado
                  </label>
                  <input
                    type="text"
                    value={nuevaAccion.presupuestoTotal}
                    onChange={(e) =>
                      setNuevaAccion({
                        ...nuevaAccion,
                        presupuestoTotal: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    % Ejecutado
                  </label>
                  <input
                    type="text"
                    value={nuevaAccion.porcentajeActual}
                    onChange={(e) =>
                      setNuevaAccion({
                        ...nuevaAccion,
                        porcentajeActual: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    % Meta
                  </label>
                  <input
                    type="text"
                    value={nuevaAccion.porcentajeTotal}
                    onChange={(e) =>
                      setNuevaAccion({
                        ...nuevaAccion,
                        porcentajeTotal: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalNuevaAccion(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-bold bg-[#00a8e8] text-white hover:bg-[#0096d1] transition shadow-2xs cursor-pointer"
                >
                  Guardar Acción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
