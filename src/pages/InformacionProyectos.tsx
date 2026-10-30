import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  FileText,
  ChevronDown,
  Edit2,
  ExternalLink,
  Copy,
  Eye,
  BarChart2,
  Trash2,
  Filter,
} from 'lucide-react';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { ModalResumenAnexo03 } from '../components/proyectos/ModalResumenAnexo03';
import { ModalCrearProyecto } from '../components/proyectos/ModalCrearProyecto';

export interface ProyectoFila {
  id: number;
  nombre: string;
  jefeProyecto: string;
  asesorTecnico: string;
  asesorOperativo: string;
  descripcion: string;
  distribucionEfectos?: string;
  observaciones?: string;
  nivelMadurez: number | null;
  tipoProyecto: 'Finalizado' | 'Archivados' | 'Con Financiamiento' | 'En Estudio';
  porcentaje: number;
}

const mockProyectosTable: ProyectoFila[] = [
  {
    id: 101,
    nombre: 'Radar Táctico de defensa Antiaérea RMF 200V',
    jefeProyecto: 'CR VILLALBA',
    asesorTecnico: 'CR VILLALBA',
    asesorOperativo: 'MY DIAZ',
    descripcion: 'Sistema de radar táctico móvil 3D para vigilancia aérea',
    nivelMadurez: 7,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 65,
  },
  {
    id: 102,
    nombre: 'SKUA - UGV ANTÁRTICO',
    jefeProyecto: 'MY MORALES',
    asesorTecnico: 'MY MORALES',
    asesorOperativo: 'SG BAPTISTA',
    descripcion: 'Vehículo terrestre no tripulado para operaciones en clima extremo antártico',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 82,
  },
  {
    id: 103,
    nombre: 'UGV PLATAFORMA MULTIPROPÓSITO',
    jefeProyecto: 'CT TERAN',
    asesorTecnico: 'CT TERAN',
    asesorOperativo: 'CI MENDOZA',
    descripcion: 'Plataforma terrestre robótica autónoma modular',
    nivelMadurez: 6,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 54,
  },
  {
    id: 104,
    nombre: 'UGV MULTIPROPÓSITO (UGV PM EA1)',
    jefeProyecto: 'CT TERAN',
    asesorTecnico: 'CT TERAN',
    asesorOperativo: 'CI MENDOZA',
    descripcion: 'Prototipo avanzado EA1 de vehículo no tripulado de apoyo logístico y táctico',
    nivelMadurez: 7,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 70,
  },
  {
    id: 105,
    nombre: 'SISTEMA DE IZAMIENTO PARA VC TAM',
    jefeProyecto: 'MY BALESTRINI',
    asesorTecnico: 'TC FERRERO',
    asesorOperativo: 'MY BALESTRINI',
    descripcion: 'Mecanismo hidráulico de izamiento y extracción de torre/motor para Tanque Argentino Mediano',
    nivelMadurez: 9,
    tipoProyecto: 'Finalizado',
    porcentaje: 100,
  },
  {
    id: 106,
    nombre: 'MODERNIZACIÓN DE LOS VCTP',
    jefeProyecto: 'TC FERRERO',
    asesorTecnico: 'TC FERRERO',
    asesorOperativo: 'CR VILLALBA',
    descripcion: 'Actualización optrónica, comunicaciones y planta motriz para Vehículo de Combate Transporte Personal',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 78,
  },
  {
    id: 107,
    nombre: 'SATAC',
    jefeProyecto: 'CR VILLALBA',
    asesorTecnico: 'CR VILLALBA',
    asesorOperativo: 'MY DIAZ',
    descripcion: 'Sistema Automatizado de Tiro de Artillería de Campaña',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentaje: 88,
  },
  {
    id: 1,
    nombre: 'SIMCAP',
    jefeProyecto: 'CT TERAN',
    asesorTecnico: 'CT TERAN',
    asesorOperativo: 'CI MENDOZA',
    descripcion: 'Simulador de Cargas Pesadas',
    nivelMadurez: 9,
    tipoProyecto: 'Archivados',
    porcentaje: 100,
  },
  {
    id: 5,
    nombre: 'Casco de Combate con Protección Balística',
    jefeProyecto: 'MY MORALES',
    asesorTecnico: 'MY MORALES',
    asesorOperativo: 'SG BAPTISTA',
    descripcion: 'Contempló el diseño y adquisición balística',
    nivelMadurez: 9,
    tipoProyecto: 'Finalizado',
    porcentaje: 95,
  },
  {
    id: 6,
    nombre: 'Cocina de Campaña Modelo EA1',
    jefeProyecto: 'MY MORALES',
    asesorTecnico: 'MY MORALES',
    asesorOperativo: 'SG BAPTISTA',
    descripcion: 'Sistema logístico remolcado de cocción y racionamiento',
    nivelMadurez: 7,
    tipoProyecto: 'Archivados',
    porcentaje: 95,
  },
  {
    id: 7,
    nombre: 'Cocina de Campaña Modelo EA2',
    jefeProyecto: 'MY MORALES',
    asesorTecnico: 'MY MORALES',
    asesorOperativo: 'SG BAPTISTA',
    descripcion: 'Plataforma de apoyo táctico y racionamiento autónomo',
    nivelMadurez: 7,
    tipoProyecto: 'Archivados',
    porcentaje: 95,
  },
  {
    id: 8,
    nombre: 'Cohetera - CP 30',
    jefeProyecto: 'DIGID',
    asesorTecnico: '',
    asesorOperativo: '',
    descripcion: 'El Lanzacohetes Múltiple Calibre 127mm',
    nivelMadurez: 9,
    tipoProyecto: 'Archivados',
    porcentaje: 100,
  },
];

export const InformacionProyectos: React.FC = () => {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState<ProyectoFila[]>(mockProyectosTable);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumenOpen, setResumenOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProyectoFila | null>(null);

  const handleGuardarNuevo = (datos: Omit<ProyectoFila, 'id'>) => {
    const nuevo: ProyectoFila = {
      id: Date.now(),
      ...datos,
    };
    setProyectos((prev) => [nuevo, ...prev]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(proyectos.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (item: ProyectoFila) => {
    setProjectToDelete(item);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return proyectos;
    const q = searchTerm.toLowerCase();
    return proyectos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.jefeProyecto.toLowerCase().includes(q) ||
        p.tipoProyecto.toLowerCase().includes(q)
    );
  }, [proyectos, searchTerm]);

  return (
    <div className="space-y-4">
      {/* 1. Header: ← Proyectos */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0284c7] hover:text-[#0369a1] transition p-0.5"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Proyectos
        </h1>
      </div>

      {/* 2. Tarjeta Listado */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden">
        {/* Barra superior con botones Resumen General y Nuevo Proyecto */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-[#334155]">Listado</h2>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={() => setResumenOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#e67e22] hover:bg-[#d35400] text-white font-bold text-xs tracking-wide shadow-2xs transition"
            >
              <FileText className="w-4 h-4" />
              <span>Resumen General</span>
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs tracking-wide shadow-2xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Nuevo Proyecto</span>
            </button>
          </div>
        </div>

        {/* Controles: Mostrar, FILTRA y Buscar */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span>Mostrar</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 pr-6 focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span>registros</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1 px-2.5 py-1 rounded border border-gray-300 bg-white text-gray-700 font-semibold text-xs hover:bg-gray-50 shadow-2xs">
              <span>FILTRA</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Buscar:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-xs w-44 sm:w-52 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#00a8e8]"
              />
            </div>
          </div>
        </div>

        {/* Tabla idéntica a image_213c01dc.png */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-[#f8fafc] text-gray-700 font-bold border-y border-gray-200 text-xs">
              <tr>
                <th className="w-10 px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === proyectos.length && proyectos.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                </th>
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Jefe De Proyecto</th>
                <th className="px-3 py-3">Asesor Técnico</th>
                <th className="px-3 py-3">Asesor Operativo</th>
                <th className="px-3 py-3">Descripción</th>
                <th className="px-3 py-3 text-center">Nivel De Madures</th>
                <th className="px-3 py-3">Tipo De Proyecto</th>
                <th className="px-3 py-3 text-center">Porcentaje</th>
                <th className="px-3 py-3 text-center">Operaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-3 font-semibold text-gray-900 max-w-xs">
                    {item.nombre}
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-700">
                    {item.jefeProyecto}
                  </td>
                  <td className="px-3 py-3 text-gray-600">
                    {item.asesorTecnico || '-'}
                  </td>
                  <td className="px-3 py-3 text-gray-600">
                    {item.asesorOperativo || '-'}
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-[11px] max-w-[140px] truncate">
                    {item.descripcion || '-'}
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-gray-800">
                    {item.nivelMadurez !== null ? item.nivelMadurez : '-'}
                  </td>
                  <td className="px-3 py-3 text-gray-700 font-medium">
                    {item.tipoProyecto}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 min-w-[70px]">
                      <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#00a86b] h-full rounded-full transition-all"
                          style={{ width: `${item.porcentaje}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-gray-700 min-w-[24px] text-right">
                        {item.porcentaje}%
                      </span>
                    </div>
                  </td>
                  {/* Matriz 3x2 de botones de operaciones como en la captura */}
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <div className="inline-grid grid-cols-2 gap-1 p-0.5 bg-gray-50 rounded border border-gray-200">
                      {/* 1. Celeste: Editar */}
                      <button
                        onClick={() => alert(`Editar ${item.nombre}`)}
                        className="w-5 h-5 rounded bg-[#00a8e8] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                        title="Modificar"
                      >
                        <Edit2 className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* 2. Naranja: Ver detalle externo */}
                      <button
                        onClick={() => alert(`Detalle de ${item.nombre}`)}
                        className="w-5 h-5 rounded bg-[#e67e22] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                        title="Abrir Ficha"
                      >
                        <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* 3. Azul: Duplicar / Copiar */}
                      <button
                        onClick={() => alert(`Duplicar ${item.nombre}`)}
                        className="w-5 h-5 rounded bg-[#2563eb] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                        title="Duplicar"
                      >
                        <Copy className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* 4. Verde: Vista rápida */}
                      <button
                        onClick={() => alert(`Vista previa de ${item.nombre}`)}
                        className="w-5 h-5 rounded bg-[#00a86b] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                        title="Ver Avance"
                      >
                        <Eye className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* 5. Violeta: Gráficos de Hitos */}
                      <button
                        onClick={() => alert(`Hitos y TRL de ${item.nombre}`)}
                        className="w-5 h-5 rounded bg-[#8b5cf6] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                        title="Evolución TRL"
                      >
                        <BarChart2 className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* 6. Rojo: Eliminar */}
                      <button
                        onClick={() => handleDelete(item)}
                        className="w-5 h-5 rounded bg-[#e15b49] text-white flex items-center justify-center hover:opacity-90 shadow-2xs cursor-pointer"
                        title="Eliminar"
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

        {/* Footer de Paginación: < [ 1 ] > */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Página 1 de 1</span>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50">
              &lt;
            </button>
            <button className="px-2.5 py-1 rounded bg-[#00a8e8] text-white font-bold text-xs shadow-2xs">
              1
            </button>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Resumen General (Anexo 03) con diseño idéntico a la captura */}
      <ModalResumenAnexo03
        isOpen={resumenOpen}
        onClose={() => setResumenOpen(false)}
        proyectosDisponibles={proyectos}
      />

      {/* Modal Crear Proyecto con diseño idéntico a las capturas */}
      <ModalCrearProyecto
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={handleGuardarNuevo}
      />

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={() => {
          if (projectToDelete) {
            setProyectos((prev) => prev.filter((p) => p.id !== projectToDelete.id));
            setProjectToDelete(null);
          }
        }}
        title="¿Desea eliminar este proyecto?"
        message={
          projectToDelete ? (
            <div>
              ¿Está seguro de que desea eliminar el proyecto{' '}
              <span className="font-bold text-gray-900">
                "{projectToDelete.nombre}"
              </span>
              ?
            </div>
          ) : ''
        }
        detail={
          projectToDelete
            ? `Jefe de Proyecto: ${projectToDelete.jefeProyecto || 'No asignado'}. Esta acción no se puede deshacer.`
            : undefined
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};
