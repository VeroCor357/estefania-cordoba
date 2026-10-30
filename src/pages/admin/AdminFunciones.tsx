import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Info,
  X,
  ChevronDown,
  ArrowUpDown,
  Lock,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

interface FuncionFila {
  id: number;
  nombre: string;
  descripcion: string;
  mostrar: boolean;
  bloqueada?: boolean;
}

const mockFuncionesListado: FuncionFila[] = [
  {
    id: 1,
    nombre: 'Borrar',
    descripcion: 'Borrar',
    mostrar: true,
    bloqueada: true,
  },
  {
    id: 2,
    nombre: 'Carga',
    descripcion: 'Editar',
    mostrar: true,
    bloqueada: true,
  },
  {
    id: 3,
    nombre: 'Ver',
    descripcion: 'Crear',
    mostrar: true,
    bloqueada: true,
  },
];

export const AdminFunciones: React.FC = () => {
  const navigate = useNavigate();
  const [funciones, setFunciones] = useState<FuncionFila[]>(mockFuncionesListado);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [funcionToDelete, setFuncionToDelete] = useState<FuncionFila | null>(null);

  // Form State
  const [formNombre, setFormNombre] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');

  const handleCrear = () => {
    if (!formNombre.trim()) {
      alert('Por favor ingrese el nombre de la función.');
      return;
    }
    const nueva: FuncionFila = {
      id: Date.now(),
      nombre: formNombre,
      descripcion: formDescripcion || formNombre,
      mostrar: true,
      bloqueada: true,
    };
    setFunciones((prev) => [...prev, nueva]);
    setModalOpen(false);
    setFormNombre('');
    setFormDescripcion('');
  };

  const handleDelete = (item: FuncionFila) => {
    setFuncionToDelete(item);
  };

  const handleToggleMostrar = (id: number) => {
    setFunciones((prev) =>
      prev.map((f) => (f.id === id ? { ...f, mostrar: !f.mostrar } : f))
    );
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return funciones;
    const q = searchTerm.toLowerCase();
    return funciones.filter(
      (f) =>
        f.nombre.toLowerCase().includes(q) ||
        f.descripcion.toLowerCase().includes(q)
    );
  }, [funciones, searchTerm]);

  return (
    <div className="space-y-4">
      {/* 1. Header: ← Funciones */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0284c7] hover:text-[#0369a1] transition p-0.5"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Funciones
        </h1>
      </div>

      {/* 2. Banner de Información Celeste como en la captura */}
      {showInfoBanner && (
        <div className="bg-[#00a8e8] text-white px-4 py-3 rounded-lg shadow-2xs flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Info className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
            <span>
              <strong>Información!</strong> Esta área es solo para administradores. Aquí se configuran las funciones que verán los usuarios finales a la hora de crear roles.
            </span>
          </div>

          <button
            onClick={() => setShowInfoBanner(false)}
            className="text-white/80 hover:text-white p-1 rounded transition"
            title="Cerrar aviso"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* 3. Tarjeta Listado con borde superior rojo */}
      <div className="bg-white rounded-lg border border-gray-200 border-t-2 border-t-[#d9534f] shadow-2xs overflow-hidden">
        {/* Barra superior con título Listado y botón rojo Nueva */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#334155]">Listado</h2>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-1.5 rounded-md bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold text-xs tracking-wide shadow-2xs transition"
          >
            Nueva
          </button>
        </div>

        {/* Controles: Mostrar [ 10 ⌵ ] y Buscar: [      ] */}
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

        {/* Tabla idéntica a image_6475dceb.png */}
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
                    <span>Mostrar</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-center">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.nombre}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {item.descripcion}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleToggleMostrar(item.id)}
                      className="px-3 py-1 rounded bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs shadow-2xs transition"
                      title="Alternar visibilidad"
                    >
                      {item.mostrar ? 'Si' : 'No'}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {/* Botón amarillo de candado/bloqueo como en captura */}
                      <button
                        onClick={() => alert(`Función ${item.nombre} protegida`)}
                        className="w-6 h-6 rounded bg-[#f39c12] text-white flex items-center justify-center shadow-2xs hover:opacity-90"
                        title="Bloqueo de seguridad"
                      >
                        <Lock className="w-3 h-3 stroke-[2.5]" />
                      </button>

                      {/* Botón rojo de cruz como en captura */}
                      <button
                        onClick={() => handleDelete(item)}
                        className="w-6 h-6 rounded bg-[#e74c3c] text-white flex items-center justify-center shadow-2xs hover:opacity-90 cursor-pointer"
                        title="Eliminar"
                      >
                        <X className="w-3.5 h-3.5 stroke-[3]" />
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
          <span>Página 1 de 1</span>

          <div className="flex items-center gap-1">
            <button
              disabled
              className="px-2 py-1 rounded border border-gray-200 text-gray-400 disabled:opacity-40 cursor-not-allowed"
            >
              &lt;
            </button>
            <button className="px-2.5 py-1 rounded bg-[#00a8e8] text-white font-bold text-xs shadow-2xs">
              1
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

      {/* Modal Nueva Función */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Nueva Función"
        subtitle="Configuración de permisos y acciones del sistema"
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
              Guardar Función
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <Input
            label="Nombre de la Función *"
            placeholder="Ej.: Exportar"
            value={formNombre}
            onChange={(e) => setFormNombre(e.target.value)}
          />

          <Input
            label="Descripción *"
            placeholder="Ej.: Exportar datos a Excel"
            value={formDescripcion}
            onChange={(e) => setFormDescripcion(e.target.value)}
          />
        </div>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={!!funcionToDelete}
        onClose={() => setFuncionToDelete(null)}
        onConfirm={() => {
          if (funcionToDelete) {
            setFunciones((prev) => prev.filter((f) => f.id !== funcionToDelete.id));
            setFuncionToDelete(null);
          }
        }}
        title="¿Desea eliminar esta función?"
        message={
          funcionToDelete ? (
            <div>
              ¿Está seguro de que desea eliminar la función{' '}
              <span className="font-bold text-gray-900">
                "{funcionToDelete.nombre}"
              </span>
              ?
            </div>
          ) : ''
        }
        detail={
          funcionToDelete
            ? `Descripción: ${funcionToDelete.descripcion}. Esta acción no se puede deshacer.`
            : undefined
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};
