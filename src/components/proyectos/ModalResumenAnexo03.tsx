import React, { useState, useMemo, useEffect } from 'react';
import {
  List,
  X,
  Search,
  FileText,
  Printer,
  Download,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export interface ProyectoItem {
  id: number | string;
  nombre: string;
  jefeProyecto?: string;
  nivelMadurez?: number | null;
  tipoProyecto?: string;
  porcentaje?: number;
  presupuesto?: string;
}

export const PROYECTOS_DEFECTO: ProyectoItem[] = [
  {
    id: 101,
    nombre: 'Radar Táctico de defensa Antiaérea RMF 200V',
    jefeProyecto: 'CR VILLALBA',
    nivelMadurez: 7,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 65,
    presupuesto: '$ 1.850.000.000',
  },
  {
    id: 102,
    nombre: 'SKUA - UGV ANTÁRTICO',
    jefeProyecto: 'MY MORALES',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 82,
    presupuesto: '$ 720.000.000',
  },
  {
    id: 103,
    nombre: 'UGV PLATAFORMA MULTIPROPÓSITO',
    jefeProyecto: 'CT TERAN',
    nivelMadurez: 6,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 54,
    presupuesto: '$ 530.000.000',
  },
  {
    id: 104,
    nombre: 'UGV MULTIPROPÓSITO (UGV PM EA1)',
    jefeProyecto: 'CT TERAN',
    nivelMadurez: 7,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 70,
    presupuesto: '$ 610.000.000',
  },
  {
    id: 105,
    nombre: 'SISTEMA DE IZAMIENTO PARA VC TAM',
    jefeProyecto: 'MY BALESTRINI',
    nivelMadurez: 9,
    tipoProyecto: 'Finalizado',
    porcentaje: 100,
    presupuesto: '$ 415.000.000',
  },
  {
    id: 106,
    nombre: 'MODERNIZACIÓN DE LOS VCTP',
    jefeProyecto: 'TC FERRERO',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 78,
    presupuesto: '$ 2.340.000.000',
  },
  {
    id: 107,
    nombre: 'SATAC',
    jefeProyecto: 'CR VILLALBA',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 88,
    presupuesto: '$ 1.150.000.000',
  },
  {
    id: 108,
    nombre: 'SIMCAP - Simulador de Cargas Pesadas',
    jefeProyecto: 'CT TERAN',
    nivelMadurez: 9,
    tipoProyecto: 'Archivados',
    porcentaje: 100,
    presupuesto: '$ 380.000.000',
  },
  {
    id: 109,
    nombre: 'Casco de Combate con Protección Balística',
    jefeProyecto: 'MY MORALES',
    nivelMadurez: 9,
    tipoProyecto: 'Finalizado',
    porcentaje: 95,
    presupuesto: '$ 290.000.000',
  },
];

interface ModalResumenAnexo03Props {
  isOpen: boolean;
  onClose: () => void;
  proyectosDisponibles?: ProyectoItem[];
}

export const ModalResumenAnexo03: React.FC<ModalResumenAnexo03Props> = ({
  isOpen,
  onClose,
  proyectosDisponibles = PROYECTOS_DEFECTO,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [alerta, setAlerta] = useState<string | null>(null);

  // Combinar proyectos asegurando que los del mockup de la captura estén disponibles
  const listaProyectos = useMemo(() => {
    const defaultNombres = new Set(PROYECTOS_DEFECTO.map((p) => p.nombre));
    const extras = proyectosDisponibles.filter((p) => !defaultNombres.has(p.nombre));
    return [...PROYECTOS_DEFECTO, ...extras];
  }, [proyectosDisponibles]);

  // Filtrado por buscador
  const proyectosFiltrados = useMemo(() => {
    if (!searchTerm.trim()) return listaProyectos;
    const q = searchTerm.toLowerCase();
    return listaProyectos.filter((p) => p.nombre.toLowerCase().includes(q));
  }, [listaProyectos, searchTerm]);

  // Manejo de seleccionar todos
  const allFilteredSelected =
    proyectosFiltrados.length > 0 &&
    proyectosFiltrados.every((p) => selectedNames.includes(p.nombre));

  const handleToggleSelectAll = () => {
    if (allFilteredSelected) {
      // Deseleccionar los filtrados
      const filteredSet = new Set(proyectosFiltrados.map((p) => p.nombre));
      setSelectedNames((prev) => prev.filter((name) => !filteredSet.has(name)));
    } else {
      // Seleccionar todos los filtrados
      const combined = new Set([...selectedNames, ...proyectosFiltrados.map((p) => p.nombre)]);
      setSelectedNames(Array.from(combined));
    }
  };

  const handleToggleOne = (nombre: string) => {
    setSelectedNames((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );
  };

  const handleGenerarPdf = () => {
    if (selectedNames.length === 0) {
      setAlerta('Seleccione al menos un proyecto para generar el Anexo 03.');
      setTimeout(() => setAlerta(null), 3500);
      return;
    }
    setShowPdfPreview(true);
  };

  const handleCloseAll = () => {
    setShowPdfPreview(false);
    onClose();
  };

  // Keyboard navigation & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showPdfPreview) {
          setShowPdfPreview(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showPdfPreview, onClose]);

  if (!isOpen) return null;

  // Proyectos seleccionados con detalle para el informe PDF
  const proyectosSeleccionadosDetalle = listaProyectos.filter((p) =>
    selectedNames.includes(p.nombre)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
        onClick={handleCloseAll}
      />

      {/* Vista Previa del Anexo 03 (Reporte Comparativo) */}
      {showPdfPreview ? (
        <div className="relative bg-white rounded-lg shadow-2xl border border-gray-300 w-full max-w-4xl max-h-[92vh] flex flex-col z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header de la vista previa del reporte */}
          <div className="bg-[#00203a] px-5 py-3 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  Vista Previa - Anexo 03: Resumen General Comparativo
                </h3>
                <p className="text-[11px] text-gray-300">
                  {selectedNames.length} proyecto(s) seleccionado(s) • Ejercicio Operativo 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0931d] hover:bg-[#de8412] text-white font-semibold text-xs rounded transition shadow-xs cursor-pointer"
                title="Imprimir / Guardar como PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / PDF</span>
              </button>
              <button
                onClick={() => setShowPdfPreview(false)}
                className="p-1 text-gray-300 hover:text-white rounded hover:bg-white/10 transition"
                title="Volver a la selección"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleCloseAll}
                className="p-1 text-gray-300 hover:text-white rounded hover:bg-white/10 transition"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contenido imprimible de la ficha técnica */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gray-50 text-gray-800">
            <div className="bg-white border border-gray-300 rounded shadow-xs p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
              {/* Encabezado Oficial */}
              <div className="border-b-2 border-gray-800 pb-4 text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-500 block">
                  EJÉRCITO ARGENTINO • DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-[#00203a] tracking-tight mt-1">
                  ANEXO 03 - RESUMEN GENERAL COMPARATIVO
                </h1>
                <p className="text-xs text-gray-600 mt-1">
                  Consolidado Comparativo de Proyectos de Investigación, Desarrollo e Innovación
                </p>
              </div>

              {/* Meta datos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-50 p-3 rounded border border-gray-200">
                <div>
                  <span className="text-gray-500 block">Fecha Emisión</span>
                  <span className="font-bold text-gray-800">{new Date().toLocaleDateString('es-AR')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Proyectos Incluidos</span>
                  <span className="font-bold text-[#00203a]">{selectedNames.length}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Dirección a Cargo</span>
                  <span className="font-bold text-gray-800">DGIyD</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Estado Documental</span>
                  <span className="font-bold text-emerald-700">Aprobado / Oficial</span>
                </div>
              </div>

              {/* Tabla Comparativa de Anexo 03 */}
              <div className="overflow-x-auto border border-gray-300 rounded">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#00203a] text-white font-bold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="px-3 py-2.5">#</th>
                      <th className="px-3 py-2.5">Proyecto</th>
                      <th className="px-3 py-2.5">Jefe Proyecto</th>
                      <th className="px-3 py-2.5 text-center">TRL</th>
                      <th className="px-3 py-2.5">Tipo</th>
                      <th className="px-3 py-2.5 text-right">Presupuesto</th>
                      <th className="px-3 py-2.5 text-center">Avance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700">
                    {proyectosSeleccionadosDetalle.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-gray-50/60">
                        <td className="px-3 py-2.5 font-bold text-gray-500 text-center">{idx + 1}</td>
                        <td className="px-3 py-2.5 font-bold text-[#00203a]">{item.nombre}</td>
                        <td className="px-3 py-2.5 text-gray-600">{item.jefeProyecto || 'DGIyD'}</td>
                        <td className="px-3 py-2.5 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px]">
                            TRL {item.nivelMadurez || 7}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[11px] font-medium text-gray-600">
                          {item.tipoProyecto || 'Con Financiamiento'}
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono font-medium text-gray-800">
                          {item.presupuesto || '$ 650.000.000'}
                        </td>
                        <td className="px-3 py-2.5 text-center font-bold text-emerald-700">
                          {item.porcentaje || 75}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen numérico */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded border border-gray-200 bg-gray-50">
                  <span className="text-gray-500 block">Promedio de Madurez</span>
                  <span className="text-lg font-bold text-[#00203a]">
                    TRL{' '}
                    {(
                      proyectosSeleccionadosDetalle.reduce(
                        (acc, curr) => acc + (curr.nivelMadurez || 7),
                        0
                      ) / (proyectosSeleccionadosDetalle.length || 1)
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="p-3 rounded border border-gray-200 bg-gray-50">
                  <span className="text-gray-500 block">Avance Físico Ponderado</span>
                  <span className="text-lg font-bold text-emerald-700">
                    {(
                      proyectosSeleccionadosDetalle.reduce(
                        (acc, curr) => acc + (curr.porcentaje || 70),
                        0
                      ) / (proyectosSeleccionadosDetalle.length || 1)
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <div className="p-3 rounded border border-gray-200 bg-gray-50">
                  <span className="text-gray-500 block">Total Proyectos Comparados</span>
                  <span className="text-lg font-bold text-gray-900">
                    {selectedNames.length} Iniciativas
                  </span>
                </div>
              </div>

              {/* Firmas institucionales */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200 text-center text-xs">
                <div>
                  <div className="w-36 h-0.5 bg-gray-400 mx-auto mb-1.5" />
                  <span className="font-bold text-gray-800 block">Jefatura DGIyD</span>
                  <span className="text-[10px] text-gray-500">Dirección General I+D</span>
                </div>
                <div>
                  <div className="w-36 h-0.5 bg-gray-400 mx-auto mb-1.5" />
                  <span className="font-bold text-gray-800 block">Subdirección Técnica</span>
                  <span className="text-[10px] text-gray-500">Supervisión y Control</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer del Reporte */}
          <div className="px-5 py-3 bg-gray-100 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setShowPdfPreview(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modificar Selección</span>
            </button>

            <button
              onClick={handleCloseAll}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold shadow-2xs transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : (
        /* Modal idéntico al diseño de la captura: image_37b47e36.png */
        <div className="relative bg-white rounded-md shadow-2xl border border-gray-300 w-full max-w-[620px] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
          {/* Header azul oscuro (#00203a) con ícono de lista hamburguesa y título */}
          <div className="bg-[#00203a] px-4 py-3 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-2.5">
              <List className="w-5 h-5 text-white stroke-[2.5]" />
              <h2 className="font-bold text-[15px] sm:text-base tracking-normal text-white">
                Seleccionar Proyectos para Anexo 03
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 p-0.5 rounded transition cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Cuerpo del modal */}
          <div className="p-5 space-y-3.5">
            {/* Texto de instrucción */}
            <p className="text-[13px] text-gray-600 leading-snug">
              Seleccione los proyectos que desea incluir en el reporte comparativo del Resumen General:
            </p>

            {/* Input de Búsqueda con ícono de lupa */}
            <div className="relative flex items-center border border-gray-300 rounded bg-white overflow-hidden shadow-2xs focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
              <div className="pl-3 pr-2 text-sky-500">
                <Search className="w-4 h-4 stroke-[2.5]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar proyecto por nombre..."
                className="w-full py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {}}
                className="pr-3 pl-2 text-gray-400 hover:text-gray-600 transition"
                tabIndex={-1}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Checkbox: Seleccionar Todos */}
            <div className="pt-0.5">
              <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={handleToggleSelectAll}
                  className="w-4 h-4 rounded border-gray-400 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-xs sm:text-[13px] font-bold text-gray-800">
                  Seleccionar Todos
                </span>
              </label>
            </div>

            {/* Cuadro contenedor con bordes y barra de scroll vertical con flechas */}
            <div className="relative border border-gray-300 rounded bg-white">
              {/* Indicador de flecha superior */}
              <div className="absolute right-1 top-1 z-10 pointer-events-none text-gray-400">
                <ChevronUp className="w-3 h-3" />
              </div>

              {/* Lista scrolleable con división entre ítems */}
              <div className="max-h-56 sm:max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1">
                {proyectosFiltrados.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400 italic">
                    No se encontraron proyectos con ese criterio.
                  </div>
                ) : (
                  proyectosFiltrados.map((item) => {
                    const isChecked = selectedNames.includes(item.nombre);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleToggleOne(item.nombre)}
                        className={`flex items-center gap-3 px-3 py-2 text-xs transition cursor-pointer select-none ${
                          isChecked ? 'bg-sky-50/50 hover:bg-sky-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleToggleOne(item.nombre);
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer shrink-0"
                        />
                        <span className="text-gray-800 font-normal leading-tight">
                          {item.nombre}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Indicador de flecha inferior */}
              <div className="absolute right-1 bottom-1 z-10 pointer-events-none text-gray-400">
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            {/* Mensaje de alerta si intenta generar sin proyectos */}
            {alerta && (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{alerta}</span>
              </div>
            )}
          </div>

            {/* Footer con botones Cancelar y Generar PDF (naranja #f0931d) */}
          <div className="px-5 pb-5 pt-1 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded border border-gray-300 bg-[#f8f9fa] hover:bg-gray-100 text-gray-700 text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleGenerarPdf}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#f0931d] hover:bg-[#de8412] text-white text-xs font-semibold transition cursor-pointer shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Generar PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
