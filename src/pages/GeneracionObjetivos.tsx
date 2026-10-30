import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Star,
  ChevronDown,
  ArrowUpDown,
  SquarePen,
  SlidersHorizontal,
  CheckCircle2,
  Calendar,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';

export interface ObjetivoFila {
  id: number;
  ordenPrioridad: number;
  esDestacado?: boolean;
  nombre: string;
  direccionCargo: string;
  progreso: number;
  fechaDesde: string;
  fechaHasta: string;
  descripcion?: string;
}

export const mockObjetivosListado: ObjetivoFila[] = [
  {
    id: 1,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reposición de Equipamiento Biomédico (Inciso 4)',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 47,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 2,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Conducción y Gestión Sanitaria',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 41,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 3,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reconocimiento Médico OOMMP',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 58,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 4,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reconocimiento Médico Personal Militar',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 15,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 5,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reconocimiento Médico SMV',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 68,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 6,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Abastecimiento Anual de los Elementos de Sanidad',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 77,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 7,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Control Asistemático.',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 100,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 8,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Despliegue de Residentes HHMM',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 72,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 9,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Mantenimiento Preventivo de Equipos Biomédicos',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 7,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
  {
    id: 10,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Servicio de distribución de cadena de frío',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 0,
    fechaDesde: '1/1/2026',
    fechaHasta: '31/12/2026',
  },
];

export const GeneracionObjetivos: React.FC = () => {
  const navigate = useNavigate();
  const [objetivos, setObjetivos] = useState<ObjetivoFila[]>(mockObjetivosListado);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const [sortKey, setSortKey] = useState<keyof ObjetivoFila>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Modal Nuevo Objetivo
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDireccion, setNuevaDireccion] = useState('DIRECCIÓN GENERAL DE SALUD');
  const [nuevoProgreso, setNuevoProgreso] = useState(0);

  // Modal Editar Objetivo
  const [editingObjetivo, setEditingObjetivo] = useState<ObjetivoFila | null>(null);

  // Modal Operaciones
  const [operacionesObjetivo, setOperacionesObjetivo] = useState<ObjetivoFila | null>(null);
  const [operacionSuccess, setOperacionSuccess] = useState(false);

  const handleSort = (key: keyof ObjetivoFila) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleCrear = () => {
    if (!nuevoNombre.trim()) {
      alert('Por favor ingrese el nombre del objetivo.');
      return;
    }
    const nuevo: ObjetivoFila = {
      id: Date.now(),
      ordenPrioridad: 0,
      esDestacado: true,
      nombre: nuevoNombre,
      direccionCargo: nuevaDireccion,
      progreso: Number(nuevoProgreso),
      fechaDesde: '1/1/2026',
      fechaHasta: '31/12/2026',
    };
    setObjetivos((prev) => [nuevo, ...prev]);
    setModalOpen(false);
    setNuevoNombre('');
  };

  const handleGuardarEdicion = () => {
    if (!editingObjetivo) return;
    setObjetivos((prev) =>
      prev.map((o) => (o.id === editingObjetivo.id ? editingObjetivo : o))
    );
    setEditingObjetivo(null);
  };

  const filteredData = useMemo(() => {
    let list = [...objetivos];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o.nombre.toLowerCase().includes(q) ||
          o.direccionCargo.toLowerCase().includes(q) ||
          String(o.ordenPrioridad).includes(q)
      );
    }
    list.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    return list;
  }, [objetivos, searchTerm, sortKey, sortAsc]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-4">
      {/* 1. Header: ← Objetivos */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="w-7 h-7 rounded-full bg-[#00a8e8] text-white flex items-center justify-center hover:bg-[#0096d1] transition shadow-2xs cursor-pointer"
          title="Volver"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Objetivos
        </h1>
      </div>

      {/* 2. Tarjeta Listado */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden">
        {/* Barra superior de tarjeta */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#334155]">Listado</h2>

          <button
            onClick={() => navigate('/generacion-objetivos/nuevo')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs tracking-wide shadow-2xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nuevo Objetivo</span>
          </button>
        </div>

        {/* Controles de tabla */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span>Mostrar</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 pr-6 focus:outline-none focus:ring-1 focus:ring-[#00a8e8] cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Buscar:</span>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-3 py-1 pr-7 text-xs w-48 sm:w-60 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabla idéntica a image_32dd05ab.png con columna Operaciones */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-[#f8fafc] text-gray-600 font-bold border-y border-gray-200 text-[11px] uppercase">
              <tr>
                <th className="w-10 px-3 py-3 text-center">
                  <div className="flex items-center justify-center">
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ordenPrioridad')}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 select-none text-center"
                >
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <span>Orden Prioridad</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('nombre')}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 select-none"
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>Nombre</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('direccionCargo')}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 select-none"
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>Dirección a Cargo</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('progreso')}
                  className="px-4 py-3 text-center cursor-pointer hover:bg-gray-100 select-none"
                >
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <span>Progreso</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fechaDesde')}
                  className="px-4 py-3 text-center cursor-pointer hover:bg-gray-100 select-none"
                >
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <span>Fecha Desde</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fechaHasta')}
                  className="px-4 py-3 text-center cursor-pointer hover:bg-gray-100 select-none"
                >
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <span>Fecha Hasta</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center">
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                    <span>Operaciones</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-3 py-2.5 text-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500 inline-block" />
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 font-mono">
                    {item.ordenPrioridad}
                  </td>
                  <td className="px-4 py-2.5 text-gray-800 font-normal max-w-md">
                    {item.nombre}
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 text-xs font-normal">
                    {item.direccionCargo}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#28a745] text-white font-bold text-xs shadow-2xs min-w-[46px] text-center">
                      {item.progreso}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 font-normal">
                    {item.fechaDesde}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-600 font-normal">
                    {item.fechaHasta}
                  </td>
                  <td className="px-4 py-2.5 text-center whitespace-nowrap">
                    <div className="inline-flex items-center justify-center gap-1.5">
                      {/* Botón 1: Edición / Operaciones (celeste/cyan #00a8cc) */}
                      <button
                        onClick={() => navigate(`/generacion-objetivos/editar/${item.id}`)}
                        title="Editar Objetivo"
                        className="w-7 h-7 rounded bg-[#00a8cc] hover:bg-[#0092b3] text-white flex items-center justify-center transition shadow-2xs cursor-pointer"
                      >
                        <SquarePen className="w-3.5 h-3.5" />
                      </button>

                      {/* Botón 2: Actividades / Acciones del Objetivo (verde #28a745) */}
                      <button
                        onClick={() => navigate(`/generacion-objetivos/actividades/${item.id}`)}
                        title="Actividades y Acciones del Objetivo"
                        className="w-7 h-7 rounded bg-[#28a745] hover:bg-[#218838] text-white flex items-center justify-center transition shadow-2xs cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación estilo captura: Página 1 de 54 | < [ 1 ] 2 3 4 5 ... 54 > */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>Página 1 de 54</span>

          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 cursor-pointer">
              &lt;
            </button>
            <button className="px-2.5 py-1 rounded bg-[#00a8e8] text-white font-bold text-xs shadow-2xs">
              1
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              2
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              3
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              4
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              5
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              54
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Editar Objetivo */}
      {editingObjetivo && (
        <Modal
          isOpen={true}
          onClose={() => setEditingObjetivo(null)}
          title="Editar Objetivo"
          subtitle="Modificar atributos y progreso del objetivo"
          maxWidth="md"
          footer={
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingObjetivo(null)}
              >
                Cancelar
              </Button>
              <button
                onClick={handleGuardarEdicion}
                className="px-4 py-2 bg-[#00a8cc] hover:bg-[#0092b3] text-white font-bold text-xs rounded-md shadow-xs transition cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <Input
              label="Nombre del Objetivo *"
              value={editingObjetivo.nombre}
              onChange={(e) =>
                setEditingObjetivo({ ...editingObjetivo, nombre: e.target.value })
              }
            />

            <Select
              label="Dirección a Cargo *"
              value={editingObjetivo.direccionCargo}
              onChange={(e) =>
                setEditingObjetivo({ ...editingObjetivo, direccionCargo: e.target.value })
              }
              options={[
                { value: 'DIRECCIÓN GENERAL DE SALUD', label: 'DIRECCIÓN GENERAL DE SALUD' },
                { value: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO', label: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO' },
                { value: 'DIRECCIÓN GENERAL DE MATERIAL', label: 'DIRECCIÓN GENERAL DE MATERIAL' },
                { value: 'DIRECCIÓN DE ARSENALES', label: 'DIRECCIÓN DE ARSENALES' },
                { value: 'DIRECCIÓN DE COMUNICACIONES E INFORMÁTICA', label: 'DIRECCIÓN DE COMUNICACIONES E INFORMÁTICA' },
                { value: 'DIRECCIÓN GENERAL DE EDUCACIÓN', label: 'DIRECCIÓN GENERAL DE EDUCACIÓN' },
              ]}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Fecha Desde"
                value={editingObjetivo.fechaDesde}
                onChange={(e) =>
                  setEditingObjetivo({ ...editingObjetivo, fechaDesde: e.target.value })
                }
              />
              <Input
                label="Fecha Hasta"
                value={editingObjetivo.fechaHasta}
                onChange={(e) =>
                  setEditingObjetivo({ ...editingObjetivo, fechaHasta: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Orden Prioridad"
                type="number"
                value={editingObjetivo.ordenPrioridad}
                onChange={(e) =>
                  setEditingObjetivo({
                    ...editingObjetivo,
                    ordenPrioridad: Number(e.target.value),
                  })
                }
              />
              <Input
                label="Progreso Actual (%)"
                type="number"
                min={0}
                max={100}
                value={editingObjetivo.progreso}
                onChange={(e) =>
                  setEditingObjetivo({
                    ...editingObjetivo,
                    progreso: Math.min(100, Math.max(0, Number(e.target.value))),
                  })
                }
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Operaciones / Parámetros del Objetivo */}
      {operacionesObjetivo && (
        <Modal
          isOpen={true}
          onClose={() => setOperacionesObjetivo(null)}
          title="Operaciones del Objetivo"
          subtitle={operacionesObjetivo.nombre}
          maxWidth="lg"
          footer={
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOperacionesObjetivo(null)}
              >
                Cerrar
              </Button>
              <button
                onClick={() => {
                  setObjetivos((prev) =>
                    prev.map((o) =>
                      o.id === operacionesObjetivo.id ? operacionesObjetivo : o
                    )
                  );
                  setOperacionSuccess(true);
                  setTimeout(() => {
                    setOperacionesObjetivo(null);
                  }, 800);
                }}
                className="px-4 py-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs rounded-md shadow-xs transition cursor-pointer"
              >
                Actualizar Operaciones
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs text-gray-700">
            {operacionSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Operaciones actualizadas correctamente.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-md border border-slate-200">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">Dirección</div>
                  <div className="font-medium text-gray-800">{operacionesObjetivo.direccionCargo}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">Vigencia</div>
                  <div className="font-medium text-gray-800">
                    {operacionesObjetivo.fechaDesde} al {operacionesObjetivo.fechaHasta}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">Progreso</div>
                  <div className="font-bold text-emerald-700">{operacionesObjetivo.progreso}%</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-sm border-b pb-1">
                Ajuste Operativo y Parámetros
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Avance Físico / Ejecución (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={operacionesObjetivo.progreso}
                    onChange={(e) =>
                      setOperacionesObjetivo({
                        ...operacionesObjetivo,
                        progreso: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#28a745]"
                  />
                  <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-bold text-[#28a745]">{operacionesObjetivo.progreso}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Orden de Prioridad Operativa
                  </label>
                  <input
                    type="number"
                    value={operacionesObjetivo.ordenPrioridad}
                    onChange={(e) =>
                      setOperacionesObjetivo({
                        ...operacionesObjetivo,
                        ordenPrioridad: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#28a745]"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Actividades / Metas Operativas Vinculadas
                </label>
                <div className="border border-gray-200 rounded-md divide-y divide-gray-100 bg-white">
                  <div className="p-2.5 flex items-center justify-between text-xs">
                    <span className="text-gray-800 font-medium">1. Relevamiento inicial y diagnóstico de necesidades</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      Completado 100%
                    </span>
                  </div>
                  <div className="p-2.5 flex items-center justify-between text-xs">
                    <span className="text-gray-800 font-medium">2. Adquisición y recepción de insumos/equipamiento</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
                      En Curso ({operacionesObjetivo.progreso}%)
                    </span>
                  </div>
                  <div className="p-2.5 flex items-center justify-between text-xs">
                    <span className="text-gray-800 font-medium">3. Instalación técnica y homologación operativa</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 text-gray-600">
                      Pendiente
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Crear Objetivo */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nuevo Objetivo Institucional"
        subtitle="Registro para el ejercicio operativo 2026"
        maxWidth="md"
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <button
              onClick={handleCrear}
              className="px-4 py-2 bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs rounded-md shadow-xs transition cursor-pointer"
            >
              Guardar Objetivo
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <Input
            label="Denominación del Objetivo *"
            placeholder="Ej.: Reposición de Equipamiento Biomédico"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />

          <Select
            label="Dirección a Cargo *"
            value={nuevaDireccion}
            onChange={(e) => setNuevaDireccion(e.target.value)}
            options={[
              { value: 'DIRECCIÓN GENERAL DE SALUD', label: 'DIRECCIÓN GENERAL DE SALUD' },
              {
                value: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
                label: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
              },
              { value: 'DIRECCIÓN GENERAL DE MATERIAL', label: 'DIRECCIÓN GENERAL DE MATERIAL' },
              { value: 'DIRECCIÓN DE ARSENALES', label: 'DIRECCIÓN DE ARSENALES' },
            ]}
          />

          <Input
            label="Porcentaje de Progreso Inicial (%)"
            type="number"
            min={0}
            max={100}
            value={nuevoProgreso}
            onChange={(e) => setNuevoProgreso(Number(e.target.value))}
          />
        </div>
      </Modal>
    </div>
  );
};
