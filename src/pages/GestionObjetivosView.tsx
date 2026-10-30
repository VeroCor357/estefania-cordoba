import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  RotateCcw,
  Gauge,
  RefreshCw,
  Menu as MenuIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DIRECCIONES_LIST } from '../components/layout/AppShell';

interface ObjetivoGestionItem {
  id: number;
  ordenPrioridad?: number | string;
  tipoObjetivo: string;
  tieneEstrella: boolean;
  denominacion: string;
  descripcion: string;
  direccionResponsable: string;
  porcentajeEjecucion: number;
  presupuestoEjecutado: number;
  presupuestoTotal: number;
  fechaUltimoAvance: string;
  motivos?: string;
}

const mockObjetivosDGIyD: ObjetivoGestionItem[] = [
  {
    id: 1,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Modernización de VCTP (Prototipo)',
    descripcion: 'Modernización de VCTP (Prototipo)',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 0,
    presupuestoEjecutado: 0,
    presupuestoTotal: 500000000.0,
    fechaUltimoAvance: 'Sin Avance',
    motivos: '',
  },
  {
    id: 2,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion:
      'Modernización del Sistema de Defensa Antiaérea del Ejército Argentino (Radar RMF-200V) (INVAP)',
    descripcion:
      'Modernización del Sistema de Defensa Antiaérea del Ejército Argentino (Radar RMF-200V) (INVAP) Inc 6. Pago por Demostración Modelo MET 3 y consola tática. Hito de pago 2do Sem 2025. Saldo: $ 567.064.7...',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 89,
    presupuestoEjecutado: 4641270000.0,
    presupuestoTotal: 5208354750.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 3,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Modernización del VC TAM (IMPSA)',
    descripcion:
      'Modernización del VC TAM (IMPSA) Inc 6. Pago Dif Cambio 2025( Faldones)( Cant 19) . Pago Soportes y Canastos ( Cant 20) . Pago Intervención de torres ( Cant 14). Saldo: $360.140.352',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 93,
    presupuestoEjecutado: 5153369647.74,
    presupuestoTotal: 5513510000.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 4,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Modernización del VC TAM (ELBIT)',
    descripcion:
      'Modernización del VC TAM (ELBIT) Inc 6. Pago Hito 11 (U$S 7.000.000) e Hito 12 (U$S 6.000.000). Entrega de 10 kits de torre 1er semestre y 5 kits 2do semestre',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 0,
    presupuestoEjecutado: 0,
    presupuestoTotal: 20715500000.0,
    fechaUltimoAvance: 'Sin Avance',
    motivos: '',
  },
  {
    id: 5,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Apoyo de las Actividades de I + D de los Proyectos',
    descripcion:
      'Apoyo de las Actividades de I + D de los Proyectos Inc 2 y Inc 3 Gastos en Libreria y viaticos(SIMDRON)',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 2,
    presupuestoEjecutado: 1312816.0,
    presupuestoTotal: 71293482.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 6,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Actualización y Mantenimiento SITEA',
    descripcion:
      'Actualización y Mantenimiento SITEA Inc 3. Servicio a contratar por 6 meses. Ejecución 2do Semestre',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 0,
    presupuestoEjecutado: 0,
    presupuestoTotal: 140000000.0,
    fechaUltimoAvance: 'Sin Avance',
    motivos: '',
  },
  {
    id: 7,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Mantenimiento del Equipamiento en Apoyo a las Actividades de I + D del CIDESO',
    descripcion:
      'Mantenimiento del Equipamiento en Apoyo a las Actividades de I + D del CIDESO Inc 2. Gastos en Libreria, Limpieza, Ferreteria, Pintura, Combustible, Repuestos.',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 30,
    presupuestoEjecutado: 12489675.0,
    presupuestoTotal: 42238621.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 8,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion:
      'Perfeccionamiento Profesional Especifico en el Área de Investigación y Desarrollo, C y T',
    descripcion:
      'Perfeccionamiento Profesional Especifico en el Área de Investigación y Desarrollo, C y T',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 0,
    presupuestoEjecutado: 0,
    presupuestoTotal: 45475597.0,
    fechaUltimoAvance: 'Sin Avance',
    motivos: '',
  },
];

const formatArCurrency = (val: number): string => {
  return val.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const GestionObjetivosView: React.FC = () => {
  const { direccionId } = useParams<{ direccionId?: string }>();

  // Find matching direction
  const selectedDir =
    DIRECCIONES_LIST.find((d) => d.id === direccionId) || DIRECCIONES_LIST[0];

  // Filters State
  const [tipoObjetivos, setTipoObjetivos] = useState('Todos');
  const [filtroDireccion, setFiltroDireccion] = useState(
    'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO'
  );
  const [ordenPrioridad, setOrdenPrioridad] = useState('Todos');
  const [estadoEjecucion, setEstadoEjecucion] = useState('Todos');
  const [fechaUltimoAvance, setFechaUltimoAvance] = useState('Todos');
  const [trimestre, setTrimestre] = useState('Todos');
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [periodo, setPeriodo] = useState('2026');

  // Sorting
  const [sortKey, setSortKey] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleResetFilters = () => {
    setTipoObjetivos('Todos');
    setFiltroDireccion('DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO');
    setOrdenPrioridad('Todos');
    setEstadoEjecucion('Todos');
    setFechaUltimoAvance('Todos');
    setTrimestre('Todos');
    setFuenteFinanciamiento('Todos');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // Filtered & Sorted list
  const filteredData = useMemo(() => {
    let list = mockObjetivosDGIyD.filter((item) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches =
          item.denominacion.toLowerCase().includes(q) ||
          item.descripcion.toLowerCase().includes(q) ||
          item.direccionResponsable.toLowerCase().includes(q) ||
          item.fechaUltimoAvance.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (tipoObjetivos !== 'Todos') {
        if (item.tipoObjetivo !== tipoObjetivos) return false;
      }
      if (estadoEjecucion !== 'Todos') {
        if (estadoEjecucion === 'Ejecutados' && item.porcentajeEjecucion === 0) return false;
        if (estadoEjecucion === 'No Ejecutados' && item.porcentajeEjecucion > 0) return false;
      }
      if (fechaUltimoAvance !== 'Todos') {
        if (fechaUltimoAvance === 'Sin Avance' && item.fechaUltimoAvance !== 'Sin Avance') return false;
      }
      return true;
    });

    if (sortKey) {
      list = [...list].sort((a, b) => {
        let valA: any = a[sortKey as keyof ObjetivoGestionItem];
        let valB: any = b[sortKey as keyof ObjetivoGestionItem];
        if (valA === undefined) valA = '';
        if (valB === undefined) valB = '';

        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      });
    }

    return list;
  }, [searchTerm, tipoObjetivos, estadoEjecucion, fechaUltimoAvance, sortKey, sortAsc]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="space-y-4">
      {/* 1. Header Superior de la Pantalla */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-tight uppercase">
            {selectedDir.fullName}
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-md px-3 py-1 text-xs shadow-2xs">
            <span className="text-gray-500 font-medium">Periodo:</span>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="font-bold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button
            onClick={() => handleResetFilters()}
            title="Refrescar vista"
            className="w-8 h-8 rounded-md bg-white border border-gray-300 text-emerald-600 hover:text-emerald-700 hover:bg-gray-50 flex items-center justify-center shadow-2xs transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Banner Verde Oscuro: TOTAL GENERAL PRESUPUESTARIO */}
      <div className="bg-[#0f2d26] text-white rounded-lg p-4 sm:p-5 shadow-sm border border-[#164339] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Gauge className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider">
              TOTAL GENERAL PRESUPUESTARIO
            </span>
            <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                $ 9.808.442.138,74
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">
                de <strong className="text-white">$ 32.236.372.450,00</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end justify-center self-stretch md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-emerald-800/40">
          <span className="bg-[#0a4a34] text-emerald-200 font-extrabold text-xs px-3 py-1 rounded-full border border-emerald-500/40 shadow-xs">
            30.43% Ejecutado
          </span>
          <span className="text-[11px] text-emerald-300/90 font-semibold mt-1">
            Restante: $ 22.427.930.311,26
          </span>
        </div>
      </div>

      {/* 3. Fila de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: Objetivos con Financiamiento */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#00a86b] text-white flex items-center justify-center">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-gray-800">
                Objetivos con Financiamiento
              </h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MenuIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg width="210" height="210" className="transform -rotate-90">
                <circle
                  cx="105"
                  cy="105"
                  r="80"
                  stroke="#e5e7eb"
                  strokeWidth="28"
                  fill="transparent"
                />
                <circle
                  cx="105"
                  cy="105"
                  r="80"
                  stroke="#dc2626"
                  strokeWidth="28"
                  strokeDasharray="502"
                  strokeDashoffset="495"
                  fill="transparent"
                />
                <circle
                  cx="105"
                  cy="105"
                  r="80"
                  stroke="#0d7042"
                  strokeWidth="28"
                  strokeDasharray="495 502"
                  strokeDashoffset="0"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  98,6%
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 tracking-widest uppercase">
                  EJECUTADOS
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#0d7042]" />
                <span>Ejecutados (98.6%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#dc2626]" />
                <span>No Ejecutados (1.4%)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 text-white text-center">
            <div className="bg-[#b32b2b] p-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90">
                NO EJECUTADOS
              </span>
              <span className="text-xs sm:text-sm font-extrabold mt-0.5">
                $ 404.093.020,00
              </span>
            </div>
            <div className="bg-[#0e7041] p-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90">
                EJECUTADOS
              </span>
              <span className="text-xs sm:text-sm font-extrabold mt-0.5">
                $ 28.500.993.655,00
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Objetivos sin Financiamiento */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#00a86b] text-white flex items-center justify-center">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-gray-800">
                Objetivos sin Financiamiento
              </h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MenuIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 flex flex-col sm:flex-row items-center justify-around gap-4">
            <div className="relative flex items-center justify-center shrink-0">
              <svg width="190" height="190" className="transform -rotate-90">
                <circle
                  cx="95"
                  cy="95"
                  r="72"
                  stroke="#e5e7eb"
                  strokeWidth="26"
                  fill="transparent"
                />
                <circle
                  cx="95"
                  cy="95"
                  r="72"
                  stroke="#2563eb"
                  strokeWidth="26"
                  strokeDasharray="122 452"
                  strokeDashoffset="0"
                  fill="transparent"
                />
                <circle
                  cx="95"
                  cy="95"
                  r="72"
                  stroke="#60a5fa"
                  strokeWidth="26"
                  strokeDasharray="69 452"
                  strokeDashoffset="-122"
                  fill="transparent"
                />
                <circle
                  cx="95"
                  cy="95"
                  r="72"
                  stroke="#93c5fd"
                  strokeWidth="26"
                  strokeDasharray="55 452"
                  strokeDashoffset="-191"
                  fill="transparent"
                />
                <circle
                  cx="95"
                  cy="95"
                  r="72"
                  stroke="#1e3a8a"
                  strokeWidth="26"
                  strokeDasharray="49 452"
                  strokeDashoffset="-246"
                  fill="transparent"
                />
                <circle
                  cx="95"
                  cy="95"
                  r="72"
                  stroke="#bfdbfe"
                  strokeWidth="26"
                  strokeDasharray="157 452"
                  strokeDashoffset="-295"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-gray-900 leading-none">
                  11
                </span>
                <span className="text-[10px] font-extrabold text-blue-900 tracking-wider uppercase mt-0.5">
                  PROYECTOS
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-gray-700 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                  <span className="text-[11px] font-medium">DESARROLLO DE SITEA</span>
                </div>
                <span className="text-[11px] font-bold">27,0%</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]" />
                  <span className="text-[11px] font-medium">PRODUCCIÓN DE DRONES</span>
                </div>
                <span className="text-[11px] font-bold">15,3%</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#93c5fd]" />
                  <span className="text-[11px] font-medium">SIMULADOR SIMDRON</span>
                </div>
                <span className="text-[11px] font-bold">12,2%</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a]" />
                  <span className="text-[11px] font-medium">SISTEMA PACK BATERÍAS TAM</span>
                </div>
                <span className="text-[11px] font-bold">10,8%</span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#bfdbfe]" />
                  <span className="text-[11px] text-gray-500">Otros 7 proyectos en cartera</span>
                </div>
                <span className="text-[11px] font-bold text-gray-600">34,7%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#b32b2b] text-white p-3 flex flex-col items-center justify-center">
            <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90">
              TOTAL SIN FINANCIAMIENTO REQUERIDO
            </span>
            <span className="text-sm font-extrabold mt-0.5">
              $ 4.085.474.999,00
            </span>
          </div>
        </div>
      </div>

      {/* 4. Sección de Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Filtros
          </h3>
          <span className="text-xs text-gray-400">
            Seleccione los criterios para refinar la tabla
          </span>
        </div>

        {/* Fila 1 de Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Tipo de Objetivos
            </label>
            <div className="relative">
              <select
                value={tipoObjetivos}
                onChange={(e) => setTipoObjetivos(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="Con Financiamiento">Con Financiamiento</option>
                <option value="Sin Financiamiento">Sin Financiamiento</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Direcciones
            </label>
            <div className="relative">
              <select
                value={filtroDireccion}
                onChange={(e) => setFiltroDireccion(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO">
                  DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO
                </option>
                <option value="DIRECCIÓN GENERAL DE MATERIAL">
                  DIRECCIÓN GENERAL DE MATERIAL
                </option>
                <option value="DIRECCIÓN DE ARSENALES">
                  DIRECCIÓN DE ARSENALES
                </option>
                <option value="DIRECCIÓN DE AVIACIÓN DE EJÉRCITO">
                  DIRECCIÓN DE AVIACIÓN DE EJÉRCITO
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Orden de Prioridad
            </label>
            <div className="relative">
              <select
                value={ordenPrioridad}
                onChange={(e) => setOrdenPrioridad(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="P1 - Crítica">P1 - Crítica</option>
                <option value="P1 - Alta">P1 - Alta</option>
                <option value="P2 - Media">P2 - Media</option>
                <option value="P3 - Regular">P3 - Regular</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Fila 2 de Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Estado de Ejecución
            </label>
            <div className="relative">
              <select
                value={estadoEjecucion}
                onChange={(e) => setEstadoEjecucion(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="Ejecutados">Ejecutados</option>
                <option value="No Ejecutados">No Ejecutados</option>
                <option value="Sin Financiamiento">Sin Financiamiento</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Fecha Último Avance
            </label>
            <div className="relative">
              <select
                value={fechaUltimoAvance}
                onChange={(e) => setFechaUltimoAvance(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="Sin Avance">Sin Avance</option>
                <option value="Último Mes">Último Mes</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Trimestre
            </label>
            <div className="relative">
              <select
                value={trimestre}
                onChange={(e) => setTrimestre(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="1er Trimestre">1er Trimestre</option>
                <option value="2do Trimestre">2do Trimestre</option>
                <option value="3er Trimestre">3er Trimestre</option>
                <option value="4to Trimestre">4to Trimestre</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-600 block mb-1">
              Fuente de Financiamiento
            </label>
            <div className="relative">
              <select
                value={fuenteFinanciamiento}
                onChange={(e) => setFuenteFinanciamiento(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="FONDEF">FONDEF</option>
                <option value="Tesoro Nacional">Tesoro Nacional</option>
                <option value="Recursos Propios">Recursos Propios</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Tabla idéntica a image_2659656c.png */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-2xs overflow-hidden">
        {/* Controles superiores: Mostrar [ 10 v ] ... Buscar: [   ] */}
        <div className="px-4 py-3 flex items-center justify-between text-xs text-gray-800">
          <div className="flex items-center gap-1.5">
            <span>Mostrar</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs bg-white text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-700 font-medium">Buscar:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs w-44 sm:w-56 focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Tabla principal */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-t border-b-2 border-gray-800 text-gray-800 font-bold text-[11px] select-none bg-white">
                <th
                  onClick={() => handleSort('ordenPrioridad')}
                  className="py-2.5 px-3 whitespace-nowrap cursor-pointer hover:bg-gray-50"
                  style={{ width: '80px' }}
                >
                  <div className="flex flex-col">
                    <span>Orden</span>
                    <span className="flex items-center gap-1">
                      Prioridad
                      <span className="text-gray-400 font-normal">⇅</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort('tipoObjetivo')}
                  className="py-2.5 px-3 whitespace-nowrap cursor-pointer hover:bg-gray-50"
                  style={{ width: '130px' }}
                >
                  <div className="flex flex-col">
                    <span>Tipo de</span>
                    <span className="flex items-center gap-1">
                      Objetivo
                      <span className="text-gray-400 font-normal">⇅</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort('denominacion')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-gray-50"
                  style={{ minWidth: '320px' }}
                >
                  <span className="inline-flex items-center gap-1">
                    Objetivo
                    <span className="text-gray-400 font-normal">⇅</span>
                  </span>
                </th>

                <th
                  onClick={() => handleSort('direccionResponsable')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-gray-50"
                  style={{ width: '160px' }}
                >
                  <span className="inline-flex items-center gap-1">
                    Responsable
                    <span className="text-gray-400 font-normal">⇅</span>
                  </span>
                </th>

                <th
                  onClick={() => handleSort('porcentajeEjecucion')}
                  className="py-2.5 px-3 text-center cursor-pointer hover:bg-gray-50"
                  style={{ width: '180px' }}
                >
                  <span className="inline-flex items-center gap-1 justify-center">
                    Estado de Ejecución
                    <span className="text-gray-400 font-normal">⇅</span>
                  </span>
                </th>

                <th
                  onClick={() => handleSort('presupuestoTotal')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-gray-50"
                  style={{ width: '220px' }}
                >
                  <span className="inline-flex items-center gap-1 justify-end">
                    Presupuesto
                    <span className="text-gray-400 font-normal">⇅</span>
                  </span>
                </th>

                <th
                  onClick={() => handleSort('fechaUltimoAvance')}
                  className="py-2.5 px-3 text-center cursor-pointer hover:bg-gray-50"
                  style={{ width: '130px' }}
                >
                  <span className="inline-flex items-center gap-1 justify-center">
                    Fecha último avance
                    <span className="text-gray-400 font-normal">⇅</span>
                  </span>
                </th>

                <th className="py-2.5 px-3 text-left" style={{ width: '80px' }}>
                  Motivos
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No se encontraron objetivos para los criterios seleccionados.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const percent = item.porcentajeEjecucion;
                  const ratio =
                    item.presupuestoTotal > 0
                      ? Math.min(100, (item.presupuestoEjecutado / item.presupuestoTotal) * 100)
                      : 0;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/70 transition-colors text-gray-800"
                    >
                      {/* Col 1: Orden Prioridad */}
                      <td className="py-3 px-3 align-top text-center text-gray-500 font-medium">
                        {item.ordenPrioridad || ''}
                      </td>

                      {/* Col 2: Tipo de Objetivo */}
                      <td className="py-3 px-3 align-top leading-tight text-gray-700">
                        <div>
                          <div>Con</div>
                          <div>Financiamiento</div>
                        </div>
                        {item.tieneEstrella && (
                          <div className="mt-1.5 text-[#eab308] text-sm leading-none">
                            ★
                          </div>
                        )}
                      </td>

                      {/* Col 3: Objetivo */}
                      <td className="py-3 px-3 align-top">
                        <div className="font-bold text-gray-900 text-[12px] leading-snug">
                          {item.denominacion}
                        </div>
                        {item.descripcion && (
                          <div className="text-[11px] text-gray-500 mt-1 leading-snug">
                            {item.descripcion}
                          </div>
                        )}
                      </td>

                      {/* Col 4: Responsable */}
                      <td className="py-3 px-3 align-top">
                        <div className="font-bold text-gray-900 text-[11px] leading-tight">
                          DIRECCIÓN
                          <br />
                          GENERAL DE
                          <br />
                          INVESTIGACIÓN
                          <br />Y DESARROLLO
                        </div>
                      </td>

                      {/* Col 5: Estado de Ejecución */}
                      <td className="py-3 px-3 align-top">
                        <div className="w-full flex items-center justify-center">
                          {percent === 0 ? (
                            <div className="w-full h-5 bg-gray-100/90 rounded-xs flex items-center px-2">
                              <span className="text-gray-300 font-bold text-xs">
                                0%
                              </span>
                            </div>
                          ) : percent >= 80 ? (
                            <div className="w-full bg-gray-100/90 rounded-xs overflow-hidden h-5">
                              <div
                                className="h-full rounded-xs flex items-center justify-center text-white font-black text-xs shadow-xs"
                                style={{
                                  width: `${percent}%`,
                                  backgroundColor: '#d9534f',
                                  backgroundImage:
                                    'linear-gradient(45deg, rgba(255,255,255,.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.2) 50%, rgba(255,255,255,.2) 75%, transparent 75%, transparent)',
                                  backgroundSize: '1rem 1rem',
                                }}
                              >
                                {percent}%
                              </div>
                            </div>
                          ) : percent > 5 ? (
                            <div className="w-full bg-gray-100/90 rounded-xs overflow-hidden h-5">
                              <div
                                className="h-full bg-[#00a86b] rounded-xs flex items-center justify-center text-white font-black text-xs shadow-xs"
                                style={{ width: `${percent}%` }}
                              >
                                {percent}%
                              </div>
                            </div>
                          ) : (
                            <div className="w-full bg-gray-100/90 rounded-xs overflow-hidden h-5 flex items-center">
                              <div
                                className="h-full bg-[#00a86b] rounded-xs"
                                style={{ width: `${percent}%` }}
                              />
                              <span className="ml-1 text-[#00a86b] font-bold text-xs">
                                {percent}%
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Col 6: Presupuesto */}
                      <td className="py-3 px-3 align-top text-right">
                        <div className="text-gray-800 text-[11px] font-medium whitespace-nowrap">
                          ${' '}
                          <span className="font-bold text-gray-900">
                            {formatArCurrency(item.presupuestoEjecutado)}
                          </span>
                          {'/'}$ {formatArCurrency(item.presupuestoTotal)}
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-xs overflow-hidden mt-1.5">
                          <div
                            className="h-full bg-[#2d6a4f]"
                            style={{ width: `${ratio}%` }}
                          />
                        </div>
                      </td>

                      {/* Col 7: Fecha último avance */}
                      <td className="py-3 px-3 align-top text-center text-gray-700 whitespace-nowrap text-[11px]">
                        {item.fechaUltimoAvance}
                      </td>

                      {/* Col 8: Motivos */}
                      <td className="py-3 px-3 align-top text-gray-500 text-[11px]">
                        {item.motivos || ''}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación y Contador inferior */}
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 bg-gray-50/40">
          <div>
            Mostrando registros del {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} al{' '}
            {Math.min(currentPage * pageSize, filteredData.length)} de un total de {filteredData.length} registros
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Anterior
            </button>

            <span className="px-3 py-1 font-bold bg-[#00875a] text-white rounded">
              {currentPage}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(Math.ceil(filteredData.length / pageSize) || 1, p + 1)
                )
              }
              disabled={currentPage >= Math.ceil(filteredData.length / pageSize)}
              className="px-2.5 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Siguiente
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
