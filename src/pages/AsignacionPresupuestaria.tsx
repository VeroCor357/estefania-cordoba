import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Edit2,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';

interface AsignacionItem {
  id: number;
  anio: number;
  elemento: string;
  moneda: string;
  presupuesto: number;
}

const mockAsignaciones: AsignacionItem[] = [
  {
    id: 1,
    anio: 2026,
    elemento: 'DIRECCIÓN GENERAL DE INGENIEROS E INFRAESTRUCTURA',
    moneda: 'Pesos',
    presupuesto: 15813070330,
  },
  {
    id: 2,
    anio: 2026,
    elemento: 'DIRECCIÓN GENERAL DE SALUD',
    moneda: 'Pesos',
    presupuesto: 5251184624,
  },
  {
    id: 3,
    anio: 2026,
    elemento: 'DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO',
    moneda: 'Pesos',
    presupuesto: 35926616675,
  },
  {
    id: 4,
    anio: 2026,
    elemento: 'DGCICD Anexo A',
    moneda: 'Pesos',
    presupuesto: 7506509112,
  },
  {
    id: 5,
    anio: 2026,
    elemento: 'DIRECCIÓN DE AVIACIÓN DE EJÉRCITO',
    moneda: 'Pesos',
    presupuesto: 4856696483,
  },
  {
    id: 6,
    anio: 2026,
    elemento: 'DIRECCIÓN GENERAL DE ORGANIZACIÓN Y DOCTRINA',
    moneda: 'Pesos',
    presupuesto: 47387667044,
  },
  {
    id: 7,
    anio: 2026,
    elemento: 'DIRECCIÓN DE ASUNTOS HISTÓRICOS DEL EJÉRCITO',
    moneda: 'Pesos',
    presupuesto: 163257708,
  },
  {
    id: 8,
    anio: 2026,
    elemento: 'DIRECCIÓN GENERAL DE INTELIGENCIA',
    moneda: 'Pesos',
    presupuesto: 1136623555,
  },
  {
    id: 9,
    anio: 2026,
    elemento: 'DIRECCIÓN DE ARSENALES',
    moneda: 'Pesos',
    presupuesto: 13060840796,
  },
  {
    id: 10,
    anio: 2026,
    elemento: 'DIRECCIÓN DE REMONTA Y VETERINARIA',
    moneda: 'Pesos',
    presupuesto: 10055207471,
  },
];

export const AsignacionPresupuestaria: React.FC = () => {
  const navigate = useNavigate();
  const [asignaciones, setAsignaciones] = useState<AsignacionItem[]>(mockAsignaciones);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State matching image_1b19a077.png
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AsignacionItem | null>(null);
  const [formElemento, setFormElemento] = useState('Cdo Guar Mil Bs As');
  const [formAnio, setFormAnio] = useState(2025);
  const [formMoneda, setFormMoneda] = useState('Pesos');
  const [formPresupuesto, setFormPresupuesto] = useState('');

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormElemento('Cdo Guar Mil Bs As');
    setFormAnio(2025);
    setFormMoneda('Pesos');
    setFormPresupuesto('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AsignacionItem) => {
    setEditingItem(item);
    setFormElemento(item.elemento);
    setFormAnio(item.anio);
    setFormMoneda(item.moneda || 'Pesos');
    setFormPresupuesto(String(item.presupuesto));
    setModalOpen(true);
  };

  const handleSave = () => {
    const parsedBudget = parseFloat(formPresupuesto.replace(/[^\d.-]/g, '')) || 0;

    if (editingItem) {
      setAsignaciones((prev) =>
        prev.map((a) =>
          a.id === editingItem.id
            ? {
                ...a,
                anio: Number(formAnio),
                elemento: formElemento,
                moneda: formMoneda,
                presupuesto: parsedBudget,
              }
            : a
        )
      );
    } else {
      const nueva: AsignacionItem = {
        id: Date.now(),
        anio: Number(formAnio),
        elemento: formElemento,
        moneda: formMoneda,
        presupuesto: parsedBudget,
      };
      setAsignaciones((prev) => [nueva, ...prev]);
    }
    setModalOpen(false);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return asignaciones;
    const q = searchTerm.toLowerCase();
    return asignaciones.filter(
      (a) =>
        a.elemento.toLowerCase().includes(q) ||
        String(a.anio).includes(q) ||
        String(a.presupuesto).includes(q)
    );
  }, [asignaciones, searchTerm]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-4">
      {/* 1. Header: ← Asignación Presupuestaria */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0284c7] hover:text-[#0369a1] transition p-0.5"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Asignación Presupuestaria
        </h1>
      </div>

      {/* 2. Tarjeta Listado */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden">
        {/* Barra superior */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#334155]">Listado</h2>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs tracking-wide shadow-2xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nueva Asignación</span>
          </button>
        </div>

        {/* Controles: Mostrar [ 10 ⌵ ] registros y Buscar: [      ] */}
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
            <span>registros</span>
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

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-[#f8fafc] text-gray-700 font-bold border-y border-gray-200 text-xs">
              <tr>
                <th className="px-6 py-3">
                  <div className="inline-flex items-center gap-2">
                    <span>Año</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3">
                  <div className="inline-flex items-center gap-2">
                    <span>Elemento</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3">
                  <div className="inline-flex items-center gap-2">
                    <span>Moneda</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3">
                  <div className="inline-flex items-center gap-2">
                    <span>Presupuesto</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-center">
                  <span>Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-3.5 text-gray-800 font-medium">
                    {item.anio}
                  </td>
                  <td className="px-6 py-3.5 text-gray-800 font-semibold text-xs">
                    {item.elemento}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600 font-medium">
                    {item.moneda}
                  </td>
                  <td className="px-6 py-3.5 text-gray-800 font-mono font-medium">
                    {item.presupuesto.toLocaleString('es-AR')}
                  </td>
                  <td className="px-6 py-3.5 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="w-6 h-6 rounded bg-[#00a8e8] hover:bg-[#0096d1] text-white inline-flex items-center justify-center shadow-2xs transition cursor-pointer"
                      title="Editar Asignación"
                    >
                      <Edit2 className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Página 1 de 4</span>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50">
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
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Nueva Asignación - Idéntico a image_1b19a077.png */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 animate-in fade-in duration-150">
          <div className="bg-white rounded shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            {/* Header del Modal */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <h3 className="text-base font-medium text-[#2c3e50]">
                {editingItem ? 'Editar Asignación' : 'Nueva Asignación'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none cursor-pointer transition p-1"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {/* Contenido / Campos del Modal */}
            <div className="px-6 py-4 space-y-5">
              {/* 1. Elemento */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Elemento
                </label>
                <div className="relative">
                  <select
                    value={formElemento}
                    onChange={(e) => setFormElemento(e.target.value)}
                    className="w-full bg-[#efeff0] text-gray-700 text-xs sm:text-sm rounded py-2.5 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                  >
                    <option value="Cdo Guar Mil Bs As">Cdo Guar Mil Bs As</option>
                    <option value="Dir Grl Inves Dllo">Dir Grl Inves Dllo</option>
                    <option value="Dir Grl Org Doct">Dir Grl Org Doct</option>
                    <option value="Dir Grl Mat">Dir Grl Mat</option>
                    <option value="Dir Grl Com Info y Ciberdefensa">Dir Grl Com Info y Ciberdefensa</option>
                    <option value="Dir Grl Icia">Dir Grl Icia</option>
                    <option value="Dir Av Ej">Dir Av Ej</option>
                    <option value="Dir Cont Fin">Dir Cont Fin</option>
                    <option value="Dir Grl Sal">Dir Grl Sal</option>
                    <option value="Dir Grl Pers Bien">Dir Grl Pers Bien</option>
                    <option value="Dir Grl Ing e Infr">Dir Grl Ing e Infr</option>
                    <option value="Dir Rem Vet">Dir Rem Vet</option>
                    <option value="Cu Grl-EMGE">Cu Grl-EMGE</option>
                    <option value="DAHE">DAHE</option>
                    <option value="Dir Ars">Dir Ars</option>
                    <option value="Dir Int">Dir Int</option>
                    <option value="Dir Transp">Dir Transp</option>
                    <option value="DIRECCIÓN GENERAL DE INGENIEROS E INFRAESTRUCTURA">DIRECCIÓN GENERAL DE INGENIEROS E INFRAESTRUCTURA</option>
                    <option value="DIRECCIÓN GENERAL DE SALUD">DIRECCIÓN GENERAL DE SALUD</option>
                    <option value="DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO">DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO</option>
                    <option value="DIRECCIÓN DE AVIACIÓN DE EJÉRCITO">DIRECCIÓN DE AVIACIÓN DE EJÉRCITO</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 2. Año */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Año
                </label>
                <div className="relative">
                  <select
                    value={formAnio}
                    onChange={(e) => setFormAnio(Number(e.target.value))}
                    className="w-full bg-[#efeff0] text-gray-700 text-xs sm:text-sm rounded py-2.5 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                  >
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                    <option value={2024}>2024</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 3. Monedas */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Monedas
                </label>
                <div className="relative">
                  <select
                    value={formMoneda}
                    onChange={(e) => setFormMoneda(e.target.value)}
                    className="w-full bg-[#efeff0] text-gray-700 text-xs sm:text-sm rounded py-2.5 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                  >
                    <option value="Pesos">Pesos</option>
                    <option value="Dólares">Dólares</option>
                    <option value="Euros">Euros</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 4. Presupuesto */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Presupuesto
                </label>
                <input
                  type="text"
                  value={formPresupuesto}
                  onChange={(e) => setFormPresupuesto(e.target.value)}
                  placeholder=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] focus:border-[#2b7cb1]"
                />
              </div>

              {/* Botones al pie: Cancelar (rojo) y Guardar (azul) */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-1.5 bg-[#e04b36] hover:bg-[#c93b27] text-white text-xs sm:text-sm font-semibold rounded shadow-xs transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-1.5 bg-[#2b7cb1] hover:bg-[#236794] text-white text-xs sm:text-sm font-semibold rounded shadow-xs transition cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
