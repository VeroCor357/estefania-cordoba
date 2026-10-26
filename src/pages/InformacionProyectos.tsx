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
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';

interface ProyectoFila {
  id: number;
  nombre: string;
  jefeProyecto: string;
  asesorTecnico: string;
  asesorOperativo: string;
  descripcion: string;
  nivelMadurez: number | null;
  tipoProyecto: 'Finalizado' | 'Archivados' | 'Con Financiamiento' | 'En Estudio';
  porcentaje: number;
}

const mockProyectosTable: ProyectoFila[] = [
  {
    id: 1,
    nombre: 'SIMCAP',
    jefeProyecto: 'CT TERAN',
    asesorTecnico: 'CT TERAN',
    asesorOperativo: 'CI MENDOZA',
    descripcion: 'Simulador de Cargas Pesadas',
    nivelMadurez: 9,
    tipoProyecto: 'Archivados',
    porcentaje: 2,
  },
  {
    id: 2,
    nombre: 'ADAPTACION PARA MORTERO CAL 120MM PARA M106',
    jefeProyecto: 'DIGID',
    asesorTecnico: '',
    asesorOperativo: '',
    descripcion: '',
    nivelMadurez: null,
    tipoProyecto: 'Archivados',
    porcentaje: 0,
  },
  {
    id: 3,
    nombre: 'BIO-DIESEL',
    jefeProyecto: 'DIGID',
    asesorTecnico: '',
    asesorOperativo: '',
    descripcion: '',
    nivelMadurez: null,
    tipoProyecto: 'Archivados',
    porcentaje: 0,
  },
  {
    id: 4,
    nombre: 'CAMIONES VUG MB 1720 4X4 Y 4X2',
    jefeProyecto: 'DIGID',
    asesorTecnico: '',
    asesorOperativo: '',
    descripcion: '',
    nivelMadurez: null,
    tipoProyecto: 'Archivados',
    porcentaje: 100,
  },
  {
    id: 5,
    nombre: 'Casco de Combate con Protección Balística',
    jefeProyecto: 'MY MORALES',
    asesorTecnico: 'MY MORALES',
    asesorOperativo: 'SG BAPTISTA',
    descripcion: 'Contemplo el diseño y adqu...',
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
    descripcion: 'Sistema logístico remolcado...',
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
    descripcion: 'Plataforma de apoyo táctico...',
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
    descripcion: 'El Lanzacohetes Múltiple C...',
    nivelMadurez: null,
    tipoProyecto: 'Archivados',
    porcentaje: 0,
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

  // Form State
  const [formNombre, setFormNombre] = useState('');
  const [formJefe, setFormJefe] = useState('');
  const [formTecnico, setFormTecnico] = useState('');
  const [formOperativo, setFormOperativo] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');
  const [formNivel, setFormNivel] = useState<number | null>(7);
  const [formTipo, setFormTipo] = useState<ProyectoFila['tipoProyecto']>('Archivados');
  const [formPorcentaje, setFormPorcentaje] = useState(50);

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

  const handleCrear = () => {
    if (!formNombre.trim()) {
      alert('Por favor ingrese el nombre del proyecto.');
      return;
    }
    const nuevo: ProyectoFila = {
      id: Date.now(),
      nombre: formNombre,
      jefeProyecto: formJefe,
      asesorTecnico: formTecnico,
      asesorOperativo: formOperativo,
      descripcion: formDescripcion,
      nivelMadurez: formNivel,
      tipoProyecto: formTipo,
      porcentaje: formPorcentaje,
    };
    setProyectos((prev) => [nuevo, ...prev]);
    setModalOpen(false);
    setFormNombre('');
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      setProyectos((prev) => prev.filter((p) => p.id !== id));
    }
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
              onClick={() => navigate('/generacion-objetivos/nuevo')}
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
                        onClick={() => handleDelete(item.id)}
                        className="w-5 h-5 rounded bg-[#e15b49] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
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

      {/* Modal Resumen General */}
      <Modal
        isOpen={resumenOpen}
        onClose={() => setResumenOpen(false)}
        title="Resumen General del Portafolio de Proyectos"
        subtitle="Consolidado de iniciativas I+D y estado de desarrollo"
        maxWidth="lg"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setResumenOpen(false)}>
            Cerrar
          </Button>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 rounded border border-gray-200 text-center">
              <span className="text-gray-500 font-medium block">Total Proyectos</span>
              <span className="text-xl font-bold text-gray-900 mt-1 block">{proyectos.length}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-center">
              <span className="text-emerald-800 font-medium block">Finalizados</span>
              <span className="text-xl font-bold text-emerald-900 mt-1 block">
                {proyectos.filter((p) => p.tipoProyecto === 'Finalizado').length}
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded border border-amber-200 text-center">
              <span className="text-amber-800 font-medium block">Archivados</span>
              <span className="text-xl font-bold text-amber-900 mt-1 block">
                {proyectos.filter((p) => p.tipoProyecto === 'Archivados').length}
              </span>
            </div>
            <div className="p-3 bg-sky-50 rounded border border-sky-200 text-center">
              <span className="text-sky-800 font-medium block">TRL Promedio</span>
              <span className="text-xl font-bold text-sky-900 mt-1 block">8 / 9</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Nuevo Proyecto */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nuevo Proyecto Tecnológico"
        subtitle="Alta de iniciativa en el catálogo general"
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
              Guardar Proyecto
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <Input
            label="Nombre del Proyecto *"
            placeholder="Ej.: SIMCAP"
            value={formNombre}
            onChange={(e) => setFormNombre(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Jefe de Proyecto"
              placeholder="CT TERAN"
              value={formJefe}
              onChange={(e) => setFormJefe(e.target.value)}
            />
            <Input
              label="Asesor Técnico"
              placeholder="CT TERAN"
              value={formTecnico}
              onChange={(e) => setFormTecnico(e.target.value)}
            />
          </div>

          <Input
            label="Asesor Operativo"
            placeholder="CI MENDOZA"
            value={formOperativo}
            onChange={(e) => setFormOperativo(e.target.value)}
          />

          <Input
            label="Descripción Corta"
            placeholder="Simulador de Cargas Pesadas..."
            value={formDescripcion}
            onChange={(e) => setFormDescripcion(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Tipo de Proyecto"
              value={formTipo}
              onChange={(e) => setFormTipo(e.target.value as ProyectoFila['tipoProyecto'])}
              options={[
                { value: 'Archivados', label: 'Archivados' },
                { value: 'Finalizado', label: 'Finalizado' },
                { value: 'Con Financiamiento', label: 'Con Financiamiento' },
                { value: 'En Estudio', label: 'En Estudio' },
              ]}
            />
            <Input
              label="Nivel de Madurez (TRL 1-9)"
              type="number"
              min={1}
              max={9}
              value={formNivel || 1}
              onChange={(e) => setFormNivel(Number(e.target.value))}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
