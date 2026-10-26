import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  PieChart,
  Menu as MenuIcon,
  RefreshCw,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface ObjetivoInicioItem {
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

const formatArCurrency = (val: number): string => {
  return val.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const mockInicioObjetivos: ObjetivoInicioItem[] = [
  {
    id: 1,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Mantenimiento y Recuperación Vehicular a Rueda TAM',
    descripcion: 'Mantenimiento preventivo y correctivo de bateas y tren de rodaje de vehículos de combate TAM',
    direccionResponsable: 'DIRECCIÓN DE ARSENALES',
    porcentajeEjecucion: 82,
    presupuestoEjecutado: 111117278370.0,
    presupuestoTotal: 135508878500.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 2,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Abastecimiento y Repuestos para Subsistemas de Artillería',
    descripcion: 'Adquisición y distribución de insumos críticos para material de artillería autopropulsada y remolcada',
    direccionResponsable: 'DIRECCIÓN GENERAL DE MATERIAL',
    porcentajeEjecucion: 71,
    presupuestoEjecutado: 43427638282.62,
    presupuestoTotal: 61165687722.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 3,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Modernización del Sistema de Defensa Antiaérea del Ejército Argentino (Radar RMF-200V) (INVAP)',
    descripcion: 'Modernización del Sistema de Defensa Antiaérea del Ejército Argentino (Radar RMF-200V) (INVAP) Inc 6. Pago por Demostración Modelo MET 3 y consola tática. Hito de pago 2do Sem 2025. Saldo: $ 567.064.7...',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 89,
    presupuestoEjecutado: 4641270000.0,
    presupuestoTotal: 5208354750.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 4,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Modernización del VC TAM (IMPSA)',
    descripcion: 'Modernización del VC TAM (IMPSA) Inc 6. Pago Dif Cambio 2025( Faldones)( Cant 19) . Pago Soportes y Canastos ( Cant 20) . Pago Intervención de torres ( Cant 14). Saldo: $360.140.352',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 93,
    presupuestoEjecutado: 5153369647.74,
    presupuestoTotal: 5513510000.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
  {
    id: 5,
    ordenPrioridad: '',
    tipoObjetivo: 'Sin Financiamiento',
    tieneEstrella: true,
    denominacion: 'Modernización de Aviónica Helicópteros Bell UH-1H',
    descripcion: 'Reemplazo de instrumentos analógicos por pantallas multifunción glass cockpit y navegación GPS táctica',
    direccionResponsable: 'DIRECCIÓN DE AVIACIÓN DE EJÉRCITO',
    porcentajeEjecucion: 0,
    presupuestoEjecutado: 0,
    presupuestoTotal: 42080120000.0,
    fechaUltimoAvance: 'Sin Avance',
    motivos: '',
  },
  {
    id: 6,
    ordenPrioridad: '',
    tipoObjetivo: 'Sin Financiamiento',
    tieneEstrella: true,
    denominacion: 'Equipamiento Táctico y Comunicaciones C4ISR',
    descripcion: 'Adquisición de radios tácticas vehiculares, mochilas HF/VHF y sistemas de encriptación militar segura',
    direccionResponsable: 'DGCICD INVERSIONES PARA EA',
    porcentajeEjecucion: 0,
    presupuestoEjecutado: 0,
    presupuestoTotal: 18027215485.0,
    fechaUltimoAvance: 'Sin Avance',
    motivos: '',
  },
  {
    id: 7,
    ordenPrioridad: '',
    tipoObjetivo: 'Con Financiamiento',
    tieneEstrella: true,
    denominacion: 'Mantenimiento del Equipamiento en Apoyo a las Actividades de I + D del CIDESO',
    descripcion: 'Mantenimiento del Equipamiento en Apoyo a las Actividades de I + D del CIDESO Inc 2. Gastos en Libreria, Limpieza, Ferreteria, Pintura, Combustible, Repuestos.',
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
    denominacion: 'Apoyo de las Actividades de I + D de los Proyectos',
    descripcion: 'Apoyo de las Actividades de I + D de los Proyectos Inc 2 y Inc 3 Gastos en Libreria y viaticos(SIMDRON)',
    direccionResponsable: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    porcentajeEjecucion: 2,
    presupuestoEjecutado: 1312816.0,
    presupuestoTotal: 71293482.0,
    fechaUltimoAvance: '16/03/2026',
    motivos: '',
  },
];

export const DashboardInicio: React.FC = () => {
  const navigate = useNavigate();
  const [ejercicio, setEjercicio] = useState('2026');
  const [drilldownFinanciamiento, setDrilldownFinanciamiento] = useState(false);

  // Filter States
  const [tipoObjetivos, setTipoObjetivos] = useState('Todos');
  const [direcciones, setDirecciones] = useState('Todos');
  const [ordenPrioridad, setOrdenPrioridad] = useState('Todos');
  const [estadoEjecucion, setEstadoEjecucion] = useState('Todos');
  const [fechaUltimoAvance, setFechaUltimoAvance] = useState('Todos');
  const [trimestre, setTrimestre] = useState('Todos');
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleRestablecer = () => {
    setTipoObjetivos('Todos');
    setDirecciones('Todos');
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

  const filteredData = useMemo(() => {
    let list = mockInicioObjetivos.filter((item) => {
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
      if (direcciones !== 'Todos') {
        if (!item.direccionResponsable.toLowerCase().includes(direcciones.toLowerCase())) return false;
      }
      if (estadoEjecucion !== 'Todos') {
        if (estadoEjecucion === 'Ejecutados' && item.porcentajeEjecucion === 0) return false;
        if (estadoEjecucion === 'No Ejecutados' && item.porcentajeEjecucion > 0) return false;
        if (estadoEjecucion === 'Sin Financiamiento' && item.tipoObjetivo !== 'Sin Financiamiento') return false;
      }
      if (fechaUltimoAvance !== 'Todos') {
        if (fechaUltimoAvance === 'Sin Avance' && item.fechaUltimoAvance !== 'Sin Avance') return false;
      }
      return true;
    });

    if (sortKey) {
      list = [...list].sort((a, b) => {
        let valA: any = a[sortKey as keyof ObjetivoInicioItem];
        let valB: any = b[sortKey as keyof ObjetivoInicioItem];
        if (valA === undefined) valA = '';
        if (valB === undefined) valB = '';

        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      });
    }

    return list;
  }, [searchTerm, tipoObjetivos, direcciones, estadoEjecucion, fechaUltimoAvance, sortKey, sortAsc]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="space-y-4">
      {/* 1. Header con flecha y selector ejercicio */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-700 hover:text-emerald-900 transition"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-baseline gap-1 text-sm font-black text-gray-800">
            <span>Inicio</span>
            <span className="text-gray-400 font-normal">/</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded px-2.5 py-1 text-xs shadow-2xs">
            <span className="text-gray-500 font-medium">EJERCICIO:</span>
            <select
              value={ejercicio}
              onChange={(e) => setEjercicio(e.target.value)}
              className="font-bold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button
            title="Exportar reporte"
            className="w-7 h-7 rounded bg-white border border-gray-300 text-gray-600 hover:text-gray-900 flex items-center justify-center shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Dos Tarjetas de Gráficos tipo Donut (Idénticas a la captura de Inicio) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: Objetivos con Financiamiento (con Vista Drilldown para Ejecutados) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between border-t-4 border-t-[#00a86b]">
          {drilldownFinanciamiento ? (
            /* VISTA DRILLDOWN EJECUTADOS (Exacta a image_cf5f7130.png con mayor separación) */
            <div className="flex flex-col h-full justify-between">
              <div className="p-3.5 border-b border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setDrilldownFinanciamiento(false)}
                  title="Volver a la vista general"
                  className="w-7 h-7 rounded-md bg-[#00a86b] hover:bg-[#008f5a] text-white flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-bold text-gray-800 text-center flex-1">
                  Objetivos con Financiamiento
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MenuIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Gráfico circular con líneas de llamada (Highcharts style - replica exacta con mayor separación) */}
              <div className="w-full overflow-x-auto py-3 flex flex-col items-center">
                <div className="relative w-full max-w-[840px] px-2">
                  <svg
                    viewBox="0 0 940 505"
                    className="w-full h-auto select-none"
                  >
                    {/* Slices */}
                    {/* 1. Dirección General de Organización y Doctrina (42,4%) - Periwinkle */}
                    <path
                      d="M 570 245 L 687 180 A 135 135 0 0 1 492 355 Z"
                      fill="#c7d2fe"
                      className="hover:opacity-90 transition-opacity cursor-pointer"
                    />

                    {/* 2. Dirección de Aviación de Ejército - Brown thin */}
                    <path
                      d="M 570 245 L 492 355 A 135 135 0 0 1 485 350 Z"
                      fill="#451a03"
                    />

                    {/* 3. Dirección de Arsenales - Bright blue */}
                    <path
                      d="M 570 245 L 485 350 A 135 135 0 0 1 470 338 Z"
                      fill="#2563eb"
                    />

                    {/* 4. DGCICD Anexo A - Dark navy */}
                    <path
                      d="M 570 245 L 470 338 A 135 135 0 0 1 458 325.5 Z"
                      fill="#1e3a5f"
                    />

                    {/* 5. Dirección General de Material (18,8%) - Deep red */}
                    <path
                      d="M 570 245 L 458 325.5 A 135 135 0 0 1 458 164.5 Z"
                      fill="#991b1b"
                      className="hover:opacity-90 transition-opacity cursor-pointer"
                    />

                    {/* 6. Cuña Negra - Múltiples Direcciones */}
                    <path
                      d="M 570 245 L 458 164.5 A 135 135 0 0 1 594 112 Z"
                      fill="#000000"
                    />

                    {/* 7. Cuña Naranja fina */}
                    <path
                      d="M 570 245 L 594 112 A 135 135 0 0 1 602 114 Z"
                      fill="#f97316"
                    />

                    {/* 8. Dirección General de Ingenieros e Infraestructura - Navy */}
                    <path
                      d="M 570 245 L 602 114 A 135 135 0 0 1 628 125 Z"
                      fill="#1e3a5f"
                    />

                    {/* 9. Dirección General de Salud - Light blue */}
                    <path
                      d="M 570 245 L 628 125 A 135 135 0 0 1 648 137 Z"
                      fill="#e0e7ff"
                    />

                    {/* 10. Dirección General de Investigación y Desarrollo - Sky blue */}
                    <path
                      d="M 570 245 L 648 137 A 135 135 0 0 1 687 180 Z"
                      fill="#93c5fd"
                    />

                    {/* Porcentajes dentro de las cuñas grandes */}
                    <text
                      x="645"
                      y="298"
                      className="fill-[#1e1b4b] text-[17px] font-bold font-sans"
                    >
                      42,4%
                    </text>
                    <text
                      x="470"
                      y="254"
                      className="fill-white text-[17px] font-bold font-sans"
                    >
                      18,8%
                    </text>

                    {/* CALLOUT LINES & LABELS (Con amplia separación y legibilidad perfecta) */}

                    {/* 1. DIRECCIÓN DE CONTADURÍA Y FINANZAS */}
                    <polyline
                      points="595,112 560,42 320,42"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="1.4"
                    />
                    <text
                      x="305"
                      y="32"
                      textAnchor="end"
                      className="fill-gray-700 text-[9px] font-bold font-sans"
                    >
                      DIRECCIÓN DE CONTADURÍA Y
                    </text>
                    <text
                      x="305"
                      y="44"
                      textAnchor="end"
                      className="fill-gray-700 text-[9px] font-bold font-sans"
                    >
                      FINANZAS DEL ESTADO MAYOR
                    </text>
                    <text
                      x="305"
                      y="56"
                      textAnchor="end"
                      className="fill-gray-700 text-[9px] font-bold font-sans"
                    >
                      GENERAL DEL EJÉRCITO
                    </text>

                    {/* 2. DIRECCIÓN DE INTENDENCIA (Separado arriba de Transporte, SIN línea según captura) */}
                    <text
                      x="305"
                      y="98"
                      textAnchor="end"
                      className="fill-gray-700 text-[10.5px] font-bold font-sans"
                    >
                      DIRECCIÓN DE INTENDENCIA
                    </text>

                    {/* BUNDLE DE LÍNEAS QUE NACEN DEL LÍMITE ENTRE LA CUÑA ROJA Y NEGRA */}
                    {/* 3. DIRECCIÓN DE TRANSPORTE (Línea roja horizontal) */}
                    <polyline
                      points="460,172 410,136 320,136"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="1.5"
                    />
                    <text
                      x="305"
                      y="140"
                      textAnchor="end"
                      className="fill-gray-700 text-[10.5px] font-bold font-sans"
                    >
                      DIRECCIÓN DE TRANSPORTE
                    </text>

                    {/* 4. DIRECCIÓN GENERAL DE INTELIGENCIA (Línea crema/marfil con holgura) */}
                    <polyline
                      points="458,170 410,138 305,190"
                      fill="none"
                      stroke="#fef08a"
                      strokeWidth="1.5"
                    />
                    <text
                      x="292"
                      y="194"
                      textAnchor="end"
                      className="fill-gray-700 text-[10.5px] font-bold font-sans"
                    >
                      DIRECCIÓN GENERAL DE INTELIGENCIA
                    </text>

                    {/* 5. DIRECCIÓN DE REMONTA Y VETERINARIA (Línea verde oscura con holgura) */}
                    <polyline
                      points="456,168 410,140 295,250"
                      fill="none"
                      stroke="#15803d"
                      strokeWidth="1.5"
                    />
                    <text
                      x="282"
                      y="254"
                      textAnchor="end"
                      className="fill-gray-700 text-[10.5px] font-bold font-sans"
                    >
                      DIRECCIÓN DE REMONTA Y VETERINARIA
                    </text>

                    {/* 6. CUARTEL GENERAL DEL ESTADO MAYOR (Línea marrón separada) */}
                    <polyline
                      points="454,166 410,142 285,310"
                      fill="none"
                      stroke="#854d0e"
                      strokeWidth="1.5"
                    />
                    <text
                      x="272"
                      y="306"
                      textAnchor="end"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      CUARTEL GENERAL DEL ESTADO
                    </text>
                    <text
                      x="272"
                      y="320"
                      textAnchor="end"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      MAYOR GENERAL DEL EJÉRCITO
                    </text>

                    {/* 7. DIRECCIÓN GENERAL DE MATERIAL (Línea roja independiente con amplio espacio) */}
                    <polyline
                      points="435,280 375,340 280,380"
                      fill="none"
                      stroke="#991b1b"
                      strokeWidth="1.5"
                    />
                    <text
                      x="268"
                      y="384"
                      textAnchor="end"
                      className="fill-gray-700 text-[10.5px] font-bold font-sans"
                    >
                      DIRECCIÓN GENERAL DE MATERIAL
                    </text>

                    {/* 8. Cdo Guar Mil Bs As (Línea beige vertical) */}
                    <polyline
                      points="594,112 594,28"
                      fill="none"
                      stroke="#d1b48c"
                      strokeWidth="1.4"
                    />
                    <text
                      x="588"
                      y="26"
                      textAnchor="end"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      Cdo Guar Mil Bs As
                    </text>

                    {/* 9. DIRECCIÓN GENERAL DE INGENIEROS E INFRAESTRUCTURA (Superior derecha) */}
                    <polyline
                      points="615,120 635,46 720,46"
                      fill="none"
                      stroke="#1e3a5f"
                      strokeWidth="1.4"
                    />
                    <text
                      x="728"
                      y="42"
                      className="fill-gray-700 text-[9.5px] font-bold font-sans"
                    >
                      DIRECCIÓN GENERAL DE
                    </text>
                    <text
                      x="728"
                      y="54"
                      className="fill-gray-700 text-[9.5px] font-bold font-sans"
                    >
                      INGENIEROS E INFRAESTRUCTURA
                    </text>

                    {/* 10. DIRECCIÓN GENERAL DE SALUD */}
                    <polyline
                      points="638,131 665,95 780,95"
                      fill="none"
                      stroke="#bfdbfe"
                      strokeWidth="1.4"
                    />
                    <text
                      x="790"
                      y="99"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      DIRECCIÓN GENERAL DE SALUD
                    </text>

                    {/* 11. DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO */}
                    <polyline
                      points="668,155 710,142 810,142"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="1.4"
                    />
                    <text
                      x="820"
                      y="138"
                      className="fill-gray-700 text-[9.5px] font-bold font-sans"
                    >
                      DIRECCIÓN GENERAL DE
                    </text>
                    <text
                      x="820"
                      y="150"
                      className="fill-gray-700 text-[9.5px] font-bold font-sans"
                    >
                      INVESTIGACIÓN Y DESARROLLO
                    </text>

                    {/* 12. DIRECCIÓN GENERAL DE ORGANIZACIÓN Y DOCTRINA (Derecha inferior) */}
                    <polyline
                      points="685,310 740,365 805,365"
                      fill="none"
                      stroke="#c7d2fe"
                      strokeWidth="1.6"
                    />
                    <text
                      x="815"
                      y="361"
                      className="fill-gray-700 text-[9.5px] font-bold font-sans"
                    >
                      DIRECCIÓN GENERAL DE
                    </text>
                    <text
                      x="815"
                      y="373"
                      className="fill-gray-700 text-[9.5px] font-bold font-sans"
                    >
                      ORGANIZACIÓN Y DOCTRINA
                    </text>

                    {/* 13. DGCICD Anexo A (Inferior izquierda) */}
                    <polyline
                      points="468,336 430,400 360,400"
                      fill="none"
                      stroke="#1e3a5f"
                      strokeWidth="1.4"
                    />
                    <text
                      x="350"
                      y="404"
                      textAnchor="end"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      DGCICD Anexo A
                    </text>

                    {/* 14. DIRECCIÓN DE ARSENALES */}
                    <polyline
                      points="480,348 450,440 395,440"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="1.4"
                    />
                    <text
                      x="385"
                      y="444"
                      textAnchor="end"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      DIRECCIÓN DE ARSENALES
                    </text>

                    {/* 15. DIRECCIÓN DE AVIACIÓN DE EJÉRCITO */}
                    <polyline
                      points="490,354 505,475 525,475"
                      fill="none"
                      stroke="#5b3924"
                      strokeWidth="1.4"
                    />
                    <text
                      x="500"
                      y="488"
                      textAnchor="end"
                      className="fill-gray-700 text-[10px] font-bold font-sans"
                    >
                      DIRECCIÓN DE AVIACIÓN DE EJÉRCITO
                    </text>

                    {/* Watermark Highcharts */}
                    <text
                      x="925"
                      y="498"
                      textAnchor="end"
                      className="fill-gray-400 text-[8.5px] font-sans select-none"
                    >
                      Highcharts.com
                    </text>
                  </svg>
                </div>
              </div>

              {/* Botón inferior verde: EJECUTADOS $ 108.641.872.743,00 */}
              <div className="flex justify-center mb-5 px-4">
                <div className="bg-[#00a86b] rounded shadow-md flex items-stretch overflow-hidden w-full max-w-sm">
                  <div className="bg-[#008f5a] p-3.5 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-2xs">
                      <svg viewBox="0 0 24 24" className="w-full h-full fill-[#008f5a]">
                        <path d="M11 2v9h9A10 10 0 0 0 11 2zm2 11v9a10 10 0 0 0 9-9h-9zm-4-1.5V2.1A10 10 0 1 0 20.9 13H11a2 2 0 0 1-2-1.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col justify-center text-white pl-4 flex-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-95">
                      EJECUTADOS
                    </span>
                    <span className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                      $ 108.641.872.743,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VISTA GENERAL DONUT (76,6% / 23,4%) */
            <>
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
                    {/* 23.4% Rojo: No Ejecutados */}
                    <circle
                      cx="105"
                      cy="105"
                      r="80"
                      stroke="#b32b2b"
                      strokeWidth="28"
                      strokeDasharray="118 502"
                      strokeDashoffset="0"
                      fill="transparent"
                    />
                    {/* 76.6% Verde: Ejecutados - Con interactividad */}
                    <circle
                      cx="105"
                      cy="105"
                      r="80"
                      stroke="#0e7041"
                      strokeWidth="28"
                      strokeDasharray="385 502"
                      strokeDashoffset="-118"
                      fill="transparent"
                      onClick={() => setDrilldownFinanciamiento(true)}
                      className="cursor-pointer transition-all duration-200 hover:stroke-[#094d2d]"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-2xl font-black text-gray-900 tracking-tight">
                      76,6%
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-800 tracking-widest uppercase">
                      EJECUTADO
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-gray-700">
                  <button
                    onClick={() => setDrilldownFinanciamiento(true)}
                    className="flex items-center gap-2 hover:text-[#0e7041] cursor-pointer"
                    title="Ver detalle de Ejecutados"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#0e7041]" />
                    <span className="underline decoration-dotted">Ejecutados: 76,6%</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#b32b2b]" />
                    <span>No Ejecutados: 23,4%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 text-white text-center">
                <div className="bg-[#b32b2b] p-3 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90">
                    NO EJECUTADOS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold mt-0.5 truncate max-w-full px-2">
                    $ 60.107.335....
                  </span>
                </div>
                <div
                  onClick={() => setDrilldownFinanciamiento(true)}
                  className="bg-[#0e7041] hover:bg-[#0a5230] p-3 flex flex-col items-center justify-center cursor-pointer transition-colors"
                  title="Hacer clic para ver detalle de Ejecutados"
                >
                  <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90">
                    EJECUTADOS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold mt-0.5 truncate max-w-full px-2">
                    $ 196.674.566...
                  </span>
                </div>
              </div>
            </>
          )}
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

          <div className="py-4 px-4 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center mb-3">
              <svg width="200" height="200" className="transform -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  stroke="#e5e7eb"
                  strokeWidth="26"
                  fill="transparent"
                />
                {/* Dir. Arsenales: 68.9% (Azul) */}
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  stroke="#2563eb"
                  strokeWidth="26"
                  strokeDasharray="311 452"
                  strokeDashoffset="0"
                  fill="transparent"
                />
                {/* DG Material: 17.6% (Bordo/Rojo) */}
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  stroke="#a82828"
                  strokeWidth="26"
                  strokeDasharray="80 452"
                  strokeDashoffset="-311"
                  fill="transparent"
                />
                {/* Dir. Aviación (Marrón) */}
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  stroke="#854d0e"
                  strokeWidth="26"
                  strokeDasharray="25 452"
                  strokeDashoffset="-391"
                  fill="transparent"
                />
                {/* DGCICD Inv. (Verde) */}
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  stroke="#059669"
                  strokeWidth="26"
                  strokeDasharray="18 452"
                  strokeDashoffset="-416"
                  fill="transparent"
                />
                {/* Cuartel Gral (Celeste) */}
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  stroke="#0284c7"
                  strokeWidth="26"
                  strokeDasharray="18 452"
                  strokeDashoffset="-434"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-xl font-black text-gray-900 leading-none">
                  68,9%
                </span>
                <span className="text-[10px] font-extrabold text-blue-900 tracking-wider uppercase mt-0.5">
                  ARSENALES
                </span>
              </div>
            </div>

            {/* Leyenda con cuadros de colores */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-[11px] text-gray-700 w-full px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="truncate">Dir. Arsenales (68.9%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#a82828]" />
                <span className="truncate">DG Material (17,6%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#854d0e]" />
                <span className="truncate">Dir. Aviación</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#059669]" />
                <span className="truncate">DGCICD Inv.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                <span className="truncate">Cuartel Gral.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#475569]" />
                <span className="truncate">Cdo Guar / Otros</span>
              </div>
            </div>
          </div>

          <div className="bg-[#b32b2b] text-white p-3 px-6">
            <div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-90 block">
                SIN FINANCIAMIENTO
              </span>
              <span className="text-sm font-extrabold mt-0.5 block">
                $ 776.626.846.106,00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Banner Azul Oscuro: TOTAL GENERAL ASIGNADO */}
      <div className="bg-[#12314d] text-white rounded-lg p-4 sm:p-5 shadow-sm border border-[#1b4369] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-950/80 border border-blue-400/30 flex items-center justify-center shrink-0">
            <PieChart className="w-6 h-6 text-sky-300" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-extrabold text-sky-300 tracking-wider">
              TOTAL GENERAL ASIGNADO
            </span>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              $ 284.757.025.706,00
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col items-start md:items-end justify-center">
          <div className="flex items-center justify-between md:justify-end gap-3 w-full">
            <div className="text-right">
              <span className="text-[11px] text-gray-300 block">Ejecución Proyectada Anual</span>
              <span className="text-xs font-bold text-emerald-300">
                92,4% de meta cumplida
              </span>
            </div>
            {/* Barra de progreso verde brillante */}
            <div className="w-24 sm:w-32 bg-blue-950 rounded-full h-2.5 overflow-hidden border border-blue-800">
              <div className="bg-[#00e676] h-full rounded-full" style={{ width: '92.4%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sección Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 border-t-2 border-t-[#00a86b] shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Filtros
          </h3>
          <button
            onClick={handleRestablecer}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer Valores</span>
          </button>
        </div>

        {/* Fila 1 */}
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
                value={direcciones}
                onChange={(e) => setDirecciones(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a86b]"
              >
                <option value="Todos">Todos</option>
                <option value="Dirección de Arsenales">Dirección de Arsenales</option>
                <option value="Dirección General de Material">Dirección General de Material</option>
                <option value="Dirección de Aviación de Ejército">Dirección de Aviación de Ejército</option>
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

        {/* Fila 2 */}
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
                <option value="Mes Actual">Mes Actual</option>
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
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Tabla idéntica a image_2659656c.png (sin columna Código) */}
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
                          <div>{item.tipoObjetivo.split(' ')[0]}</div>
                          <div>{item.tipoObjetivo.split(' ').slice(1).join(' ')}</div>
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
                        <div className="font-bold text-gray-900 text-[11px] leading-tight uppercase">
                          {item.direccionResponsable}
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
