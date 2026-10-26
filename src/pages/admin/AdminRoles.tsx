import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  ArrowUpDown,
  Edit2,
  Trash2,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

interface RolFila {
  id: number;
  nombre: string;
  descripcion: string;
}

export const AdminRoles: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RolFila[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [formNombre, setFormNombre] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');

  const handleCrear = () => {
    if (!formNombre.trim()) {
      alert('Por favor ingrese el nombre del rol.');
      return;
    }
    const nuevo: RolFila = {
      id: Date.now(),
      nombre: formNombre,
      descripcion: formDescripcion,
    };
    setRoles((prev) => [...prev, nuevo]);
    setModalOpen(false);
    setFormNombre('');
    setFormDescripcion('');
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este rol?')) {
      setRoles((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return roles;
    const q = searchTerm.toLowerCase();
    return roles.filter(
      (r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.descripcion.toLowerCase().includes(q)
    );
  }, [roles, searchTerm]);

  return (
    <div className="space-y-4">
      {/* 1. Header con flecha y breadcrumb a la derecha */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(-1)}
            className="text-[#0284c7] hover:text-[#0369a1] transition p-0.5"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
            Roles
          </h1>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          <span>Administración Sistema</span>
          <span className="mx-1">/</span>
          <span className="font-bold text-gray-800">Roles</span>
        </div>
      </div>

      {/* 2. Tarjeta con borde superior rojo (accent) */}
      <div className="bg-white rounded-lg border border-gray-200 border-t-2 border-t-[#d9534f] shadow-2xs overflow-hidden">
        {/* Barra superior con título LISTADO y botón rojo Nueva */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#334155] uppercase tracking-wide">
            LISTADO
          </h2>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-1.5 rounded-md bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold text-xs tracking-wide shadow-2xs transition"
          >
            Nueva
          </button>
        </div>

        {/* Controles: Mostrar [ 10 ⌵ ] y Buscar: [       ] */}
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
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Buscar:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                    <span>Nombre</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3">
                  <div className="inline-flex items-center gap-2">
                    <span>Descripción</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-center">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <span>Actions</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500 font-medium text-xs">
                    No data available in table
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors border-b border-gray-100">
                    <td className="px-6 py-3 text-gray-900 font-bold">
                      {item.nombre}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {item.descripcion}
                    </td>
                    <td className="px-6 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => alert(`Editar ${item.nombre}`)}
                          className="w-6 h-6 rounded bg-[#00a8e8] text-white flex items-center justify-center shadow-2xs hover:opacity-90"
                        >
                          <Edit2 className="w-3 h-3 stroke-[2.5]" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-6 h-6 rounded bg-[#e74c3c] text-white flex items-center justify-center shadow-2xs hover:opacity-90"
                        >
                          <Trash2 className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            {filteredData.length === 0
              ? 'No hay registros disponibles'
              : `Mostrando 1 a ${filteredData.length} de ${filteredData.length} registros`}
          </span>

          <div className="flex items-center gap-1">
            <button
              disabled
              className="px-2 py-1 rounded border border-gray-200 text-gray-400 disabled:opacity-40 cursor-not-allowed"
            >
              &lt;
            </button>
            <button
              disabled
              className="px-2 py-1 rounded border border-gray-200 text-gray-400 disabled:opacity-40 cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Nota inferior como en la captura */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 px-1 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-gray-600 uppercase text-[11px] tracking-wide">
            MÓDULO DE SEGURIDAD SCGEA
          </span>
        </div>
        <span className="text-[11px] text-gray-400 mt-1 sm:mt-0">
          Mantenimiento de Permisos y Perfiles
        </span>
      </div>

      {/* Modal Nuevo Rol */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Nuevo Rol"
        subtitle="Definición de rol de acceso en el sistema SCGEA"
        maxWidth="md"
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <button
              onClick={handleCrear}
              className="px-4 py-2 bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold text-xs rounded-md shadow-xs transition"
            >
              Guardar Rol
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <Input
            label="Nombre del Rol *"
            placeholder="Ej.: Auditor Presupuestario"
            value={formNombre}
            onChange={(e) => setFormNombre(e.target.value)}
          />

          <Input
            label="Descripción del Rol *"
            placeholder="Alcance y permisos..."
            value={formDescripcion}
            onChange={(e) => setFormDescripcion(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};
