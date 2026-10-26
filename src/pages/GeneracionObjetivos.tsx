import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Star,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';

interface ObjetivoFila {
  id: number;
  ordenPrioridad: number;
  esDestacado?: boolean;
  nombre: string;
  direccionCargo: string;
  progreso: number;
  fechaDesde: string;
}

const mockObjetivosListado: ObjetivoFila[] = [
  {
    id: 1,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reposición de Equipamiento Biomédico (Inciso 4)',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 43,
    fechaDesde: '1/1/2026',
  },
  {
    id: 2,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Conducción y Gestión Sanitaria',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 41,
    fechaDesde: '1/1/2026',
  },
  {
    id: 3,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reconocimiento Médico OOMMP',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 58,
    fechaDesde: '1/1/2026',
  },
  {
    id: 4,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reconocimiento Médico Personal Militar',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 15,
    fechaDesde: '1/1/2026',
  },
  {
    id: 5,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Reconocimiento Médico SMV',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 68,
    fechaDesde: '1/1/2026',
  },
  {
    id: 6,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Abastecimiento Anual de los Elementos de Sanidad',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 77,
    fechaDesde: '1/1/2026',
  },
  {
    id: 7,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Control Asistemático.',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 100,
    fechaDesde: '1/1/2026',
  },
  {
    id: 8,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Despliegue de Residentes HHMM',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 72,
    fechaDesde: '1/1/2026',
  },
  {
    id: 9,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Mantenimiento Preventivo de Equipos Biomédicos',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 7,
    fechaDesde: '1/1/2026',
  },
  {
    id: 10,
    ordenPrioridad: 0,
    esDestacado: true,
    nombre: 'Servicio de distribución de cadena de frío',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    progreso: 0,
    fechaDesde: '1/1/2026',
  },
];

export const GeneracionObjetivos: React.FC = () => {
  const navigate = useNavigate();
  const [objetivos, setObjetivos] = useState<ObjetivoFila[]>(mockObjetivosListado);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal Nuevo Objetivo
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDireccion, setNuevaDireccion] = useState('DIRECCIÓN GENERAL DE SALUD');
  const [nuevoProgreso, setNuevoProgreso] = useState(0);

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
    };
    setObjetivos((prev) => [nuevo, ...prev]);
    setModalOpen(false);
    setNuevoNombre('');
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return objetivos;
    const q = searchTerm.toLowerCase();
    return objetivos.filter(
      (o) =>
        o.nombre.toLowerCase().includes(q) ||
        o.direccionCargo.toLowerCase().includes(q)
    );
  }, [objetivos, searchTerm]);

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
          className="w-7 h-7 rounded-full bg-[#00a8e8] text-white flex items-center justify-center hover:bg-[#0096d1] transition shadow-2xs"
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
                className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 pr-6 focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 pr-7 text-xs w-48 sm:w-60 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabla idéntica a image_745a4ff5.png */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-[#f8fafc] text-gray-600 font-bold border-y border-gray-200 text-[11px] uppercase">
              <tr>
                <th className="w-10 px-4 py-3 text-center">#</th>
                <th className="px-4 py-3">
                  <div className="inline-flex items-center gap-1.5">
                    <span>ORDEN PRIORIDAD</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="inline-flex items-center gap-1.5">
                    <span>NOMBRE</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3">
                  <div className="inline-flex items-center gap-1.5">
                    <span>DIRECCIÓN A CARGO</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center">
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <span>PROGRESO</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center">
                  <div className="inline-flex items-center gap-1.5 justify-center">
                    <span>FECHA DESDE</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3 text-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500 inline-block" />
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-mono">
                    {item.ordenPrioridad}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium max-w-md">
                    {item.nombre}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-[11px] font-semibold">
                    {item.direccionCargo}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-3 py-1 rounded bg-[#00a86b] text-white font-bold text-xs shadow-2xs">
                      {item.progreso}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {item.fechaDesde}
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
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50">
              &lt;
            </button>
            <button className="px-2.5 py-1 rounded bg-[#00a8e8] text-white font-bold text-xs shadow-2xs">
              1
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              3
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              4
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              5
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              54
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Objetivo */}
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
              className="px-4 py-2 bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs rounded-md shadow-xs transition"
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
              { value: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO', label: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO' },
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
