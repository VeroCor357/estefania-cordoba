import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Search,
  ChevronDown,
  ArrowUpDown,
  X,
  Calendar,
} from 'lucide-react';

export interface PeriodoItem {
  id: number;
  anio: number;
  trimestre: string;
  fechaInicio: string;
  fechaFin: string;
}

const mockPeriodosInitial: PeriodoItem[] = [
  {
    id: 1,
    anio: 2025,
    trimestre: 'Trimestre 1',
    fechaInicio: '01/01/2025',
    fechaFin: '30/03/2025',
  },
  {
    id: 2,
    anio: 2025,
    trimestre: 'Trimestre 2',
    fechaInicio: '01/04/2025',
    fechaFin: '30/06/2025',
  },
  {
    id: 3,
    anio: 2025,
    trimestre: 'Trimestre 3',
    fechaInicio: '01/07/2025',
    fechaFin: '30/09/2025',
  },
  {
    id: 4,
    anio: 2025,
    trimestre: 'Trimestre 4',
    fechaInicio: '01/10/2025',
    fechaFin: '31/12/2025',
  },
  {
    id: 5,
    anio: 2026,
    trimestre: 'Trimestre 1',
    fechaInicio: '01/01/2026',
    fechaFin: '31/03/2026',
  },
  {
    id: 6,
    anio: 2026,
    trimestre: 'Trimestre 2',
    fechaInicio: '01/04/2026',
    fechaFin: '30/06/2026',
  },
  {
    id: 7,
    anio: 2026,
    trimestre: 'Trimestre 3',
    fechaInicio: '01/07/2026',
    fechaFin: '30/09/2026',
  },
  {
    id: 8,
    anio: 2026,
    trimestre: 'Trimestre 4',
    fechaInicio: '01/10/2026',
    fechaFin: '31/12/2026',
  },
];

export const DatosEstaticosPeriodos: React.FC = () => {
  const navigate = useNavigate();
  const [periodos, setPeriodos] = useState<PeriodoItem[]>(mockPeriodosInitial);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const [sortField, setSortField] = useState<keyof PeriodoItem>('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PeriodoItem | null>(null);
  const [formAnio, setFormAnio] = useState<string | number>('');
  const [formTrimestre, setFormTrimestre] = useState('');
  const [formFechaInicio, setFormFechaInicio] = useState('');
  const [formFechaFin, setFormFechaFin] = useState('');

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormAnio('');
    setFormTrimestre('');
    setFormFechaInicio('');
    setFormFechaFin('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: PeriodoItem) => {
    setEditingItem(item);
    setFormAnio(item.anio);
    setFormTrimestre(item.trimestre);
    setFormFechaInicio(item.fechaInicio);
    setFormFechaFin(item.fechaFin);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este registro?')) {
      setPeriodos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setPeriodos((prev) =>
        prev.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                anio: Number(formAnio) || p.anio,
                trimestre: formTrimestre || p.trimestre,
                fechaInicio: formFechaInicio || p.fechaInicio,
                fechaFin: formFechaFin || p.fechaFin,
              }
            : p
        )
      );
    } else {
      const nuevo: PeriodoItem = {
        id: Date.now(),
        anio: Number(formAnio) || 2027,
        trimestre: formTrimestre || 'Trimestre 1',
        fechaInicio: formFechaInicio || '01/01/2027',
        fechaFin: formFechaFin || '31/03/2027',
      };
      setPeriodos((prev) => [...prev, nuevo]);
    }
    setModalOpen(false);
  };

  const handleSort = (field: keyof PeriodoItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let result = periodos.filter((p) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        String(p.anio).includes(q) ||
        p.trimestre.toLowerCase().includes(q) ||
        p.fechaInicio.includes(q) ||
        p.fechaFin.includes(q)
      );
    });

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [periodos, searchTerm, sortField, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-4">
      {/* 1. Header con flecha y título: ← Periodos */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0284c7] hover:text-[#0369a1] transition p-0.5"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Periodos
        </h1>
      </div>

      {/* 2. Card Principal de Listado */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden">
        {/* Barra superior de la tarjeta: "Listado" y "+ Nuevo Periodo" */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#334155]">Listado</h2>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs tracking-wide shadow-2xs transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nueva Asignación</span>
          </button>
        </div>

        {/* Controles: Mostrar [ 10 ⌵ ] y Buscar: [       ] */}
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
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-xs w-48 sm:w-56 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
            />
          </div>
        </div>

        {/* Tabla idéntica a image_aad25eb1.png */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-[#f8fafc] text-gray-700 font-bold border-y border-gray-200 text-xs">
              <tr>
                <th
                  onClick={() => handleSort('anio')}
                  className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100/80 transition"
                >
                  <div className="inline-flex items-center gap-2">
                    <span>Año</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('trimestre')}
                  className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100/80 transition"
                >
                  <div className="inline-flex items-center gap-2">
                    <span>Trimestre</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fechaInicio')}
                  className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100/80 transition"
                >
                  <div className="inline-flex items-center gap-2">
                    <span>Fecha Inicio</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fechaFin')}
                  className="px-6 py-3 cursor-pointer select-none hover:bg-gray-100/80 transition"
                >
                  <div className="inline-flex items-center gap-2">
                    <span>Fecha Fin</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-center">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <span>Acciones</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.anio}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.trimestre}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.fechaInicio}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.fechaFin}
                  </td>
                  <td className="px-6 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {/* Botón Editar Cyan/Turquesa como en captura */}
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="w-6 h-6 rounded bg-[#00a8e8] hover:bg-[#0096d1] text-white flex items-center justify-center shadow-2xs transition"
                        title="Modificar Periodo"
                      >
                        <Edit2 className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* Botón Eliminar Rojo como en captura */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-6 h-6 rounded bg-[#e15b49] hover:bg-[#cb4d3c] text-white flex items-center justify-center shadow-2xs transition"
                        title="Eliminar Periodo"
                      >
                        <Trash2 className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Página {currentPage} de {totalPages}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-2 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &lt;
            </button>
            <button className="px-2.5 py-1 rounded bg-[#00a8e8] text-white font-bold text-xs shadow-2xs">
              1
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-2 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Nueva Asignación (diseño exacto captura) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Dialog */}
          <div className="relative bg-white rounded shadow-2xl border border-gray-300 w-full max-w-xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-100">
            {/* Header: fondo blanco, título gris, 'x' a la derecha */}
            <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-base text-gray-700 font-normal">
                {editingItem ? 'Modificar Asignación' : 'Nueva Asignación'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1 text-xl leading-none font-semibold"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {/* Formulario */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Año
                </label>
                <input
                  type="text"
                  value={formAnio}
                  onChange={(e) => setFormAnio(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Trimestre
                </label>
                <input
                  type="text"
                  value={formTrimestre}
                  onChange={(e) => setFormTrimestre(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Fecha Inicio
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={formFechaInicio}
                    onChange={(e) => setFormFechaInicio(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-9 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <Calendar className="w-4 h-4 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Fecha Fin
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={formFechaFin}
                    onChange={(e) => setFormFechaFin(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-9 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <Calendar className="w-4 h-4 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Footer con botones Cerrar (Rojo) y Aceptar (Azul) */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-white">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 text-xs font-medium text-white bg-[#d9534f] hover:bg-[#c9302c] rounded shadow-2xs transition"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-xs font-medium text-white bg-[#337ab7] hover:bg-[#286090] rounded shadow-2xs transition"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
