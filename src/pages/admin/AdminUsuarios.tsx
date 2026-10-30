import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  User,
  Edit2,
  Trash2,
  Settings,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';

interface UsuarioFila {
  id: number;
  usuario: string;
  nroDocumento: string;
  apellido: string;
  nombre: string;
  roles: string;
  soloAgregar?: boolean;
}

const mockUsuariosListado: UsuarioFila[] = [
  {
    id: 1,
    usuario: 'hrobalo',
    nroDocumento: '25375511',
    apellido: 'RÓBALO',
    nombre: 'Haroldo Néstor Eduardo',
    roles: 'Cdo Guar Mil Bs AS',
    soloAgregar: true,
  },
  {
    id: 2,
    usuario: 'andremartinez',
    nroDocumento: '41355297',
    apellido: 'MARTINEZ',
    nombre: 'Andrea Rita',
    roles: 'Admin',
  },
  {
    id: 3,
    usuario: 'sabravo',
    nroDocumento: '26939876',
    apellido: 'BRAVO',
    nombre: 'Silvia Andrea',
    roles: 'Dir Cont Fin - EMGE',
  },
  {
    id: 4,
    usuario: 'rsoldad',
    nroDocumento: '26175551',
    apellido: 'SOLDAD',
    nombre: 'Romina Lorena Carolina',
    roles: 'Admin',
  },
  {
    id: 5,
    usuario: 'ccarugno',
    nroDocumento: '17787850',
    apellido: 'CARUGNO',
    nombre: 'Carlos Alberto',
    roles: 'SUBJEMGE',
    soloAgregar: true,
  },
  {
    id: 6,
    usuario: 'joelemamani',
    nroDocumento: '40176183',
    apellido: 'MAMANI',
    nombre: 'Joel Ezequiel',
    roles: 'Dir Grl Inves Dllo',
  },
  {
    id: 7,
    usuario: 'gcaiconte',
    nroDocumento: '33264752',
    apellido: 'CAICONTE',
    nombre: 'Gabriela Anabel',
    roles: 'Dir Grl Mat',
  },
  {
    id: 8,
    usuario: 'alanavarro',
    nroDocumento: '42214007',
    apellido: 'NAVARRO',
    nombre: 'Alan Franco',
    roles: 'Dir Rem Vet',
  },
  {
    id: 9,
    usuario: 'mpgallo',
    nroDocumento: '21834822',
    apellido: 'GALLO',
    nombre: 'Mariano Pablo',
    roles: 'Dir Grl Com Info y CIBERDEFENSA',
  },
  {
    id: 10,
    usuario: 'hlalonso',
    nroDocumento: '18057071',
    apellido: 'ALONSO',
    nombre: 'Horacio Luis Ramon',
    roles: 'Cdo Guar Mil Bs AS',
  },
];

export const AdminUsuarios: React.FC = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<UsuarioFila[]>(mockUsuariosListado);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UsuarioFila | null>(null);

  // Form State
  const [formUsuario, setFormUsuario] = useState('');
  const [formDni, setFormDni] = useState('');
  const [formApellido, setFormApellido] = useState('');
  const [formNombre, setFormNombre] = useState('');
  const [formRol, setFormRol] = useState('Admin');

  const handleCrear = () => {
    if (!formUsuario || !formApellido || !formNombre) {
      alert('Por favor complete los campos obligatorios.');
      return;
    }
    const nuevo: UsuarioFila = {
      id: Date.now(),
      usuario: formUsuario,
      nroDocumento: formDni || '30000000',
      apellido: formApellido.toUpperCase(),
      nombre: formNombre,
      roles: formRol,
    };
    setUsuarios((prev) => [nuevo, ...prev]);
    setModalOpen(false);
  };

  const handleDelete = (item: UsuarioFila) => {
    setUserToDelete(item);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return usuarios;
    const q = searchTerm.toLowerCase();
    return usuarios.filter(
      (u) =>
        u.usuario.toLowerCase().includes(q) ||
        u.apellido.toLowerCase().includes(q) ||
        u.nombre.toLowerCase().includes(q) ||
        u.roles.toLowerCase().includes(q) ||
        u.nroDocumento.includes(q)
    );
  }, [usuarios, searchTerm]);

  return (
    <div className="space-y-4">
      {/* 1. Header: ← Usuarios */}
      <div className="flex items-center gap-2.5 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="text-[#0284c7] hover:text-[#0369a1] transition p-0.5"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Usuarios
        </h1>
      </div>

      {/* 2. Tarjeta Listado */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-2xs overflow-hidden">
        {/* Barra superior */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#334155]">Listado</h2>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs tracking-wide shadow-2xs transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nuevo usuario</span>
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

        {/* Tabla idéntica a image_b1258d80.png */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700 border-collapse">
            <thead className="bg-[#f8fafc] text-gray-700 font-bold border-y border-gray-200 text-xs">
              <tr>
                <th className="w-12 px-4 py-3 text-center">Perfil</th>
                <th className="px-4 py-3">Usuario</th>
                <th className="px-4 py-3">NroDocumento</th>
                <th className="px-4 py-3">Apellido</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-2.5 text-center">
                    <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto">
                      <User className="w-4 h-4" />
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-800 font-medium">
                    {item.usuario}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 font-mono">
                    {item.nroDocumento}
                  </td>
                  <td className="px-4 py-2.5 text-gray-900 font-bold uppercase">
                    {item.apellido}
                  </td>
                  <td className="px-4 py-2.5 text-gray-800">
                    {item.nombre}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 font-medium">
                    {item.roles}
                  </td>
                  <td className="px-4 py-2.5 text-center whitespace-nowrap">
                    {item.soloAgregar ? (
                      /* Botón verde de asignar/agregar (+) */
                      <button
                        onClick={() => alert(`Asignar rol a ${item.usuario}`)}
                        className="w-5 h-5 rounded bg-[#00a86b] text-white inline-flex items-center justify-center hover:opacity-90 shadow-2xs"
                        title="Asignar Rol"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    ) : (
                      /* 4 botones de acción cuadrados de colores como en la captura */
                      <div className="inline-flex items-center gap-1">
                        {/* Naranja: Credencial / Imagen */}
                        <button
                          onClick={() => alert(`Ficha de ${item.usuario}`)}
                          className="w-5 h-5 rounded bg-[#f39c12] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                          title="Ficha Personal"
                        >
                          <ImageIcon className="w-3 h-3" />
                        </button>

                        {/* Celeste: Editar */}
                        <button
                          onClick={() => alert(`Modificar ${item.usuario}`)}
                          className="w-5 h-5 rounded bg-[#00a8e8] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                          title="Modificar"
                        >
                          <Edit2 className="w-3 h-3 stroke-[2.5]" />
                        </button>

                        {/* Amarillo/Dorado: Permisos / Engranaje */}
                        <button
                          onClick={() => alert(`Permisos de ${item.usuario}`)}
                          className="w-5 h-5 rounded bg-[#f1c40f] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
                          title="Configuración"
                        >
                          <Settings className="w-3 h-3 stroke-[2.5]" />
                        </button>

                        {/* Rojo: Eliminar */}
                        <button
                          onClick={() => handleDelete(item)}
                          className="w-5 h-5 rounded bg-[#e74c3c] text-white flex items-center justify-center hover:opacity-90 shadow-2xs cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación: Página 1 de 14 | < [ 1 ] 2 3 4 5 ... 14 > */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>Página 1 de 14</span>

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
              14
            </button>
            <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Nuevo Usuario */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nuevo Usuario del Sistema"
        subtitle="Registro de cuenta institucional para el SCGEA"
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
              Guardar Usuario
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          <Input
            label="Nombre de Usuario (Login) *"
            placeholder="Ej.: jmartinez"
            value={formUsuario}
            onChange={(e) => setFormUsuario(e.target.value)}
          />

          <Input
            label="Número de Documento *"
            placeholder="35123456"
            value={formDni}
            onChange={(e) => setFormDni(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Apellido *"
              placeholder="MARTINEZ"
              value={formApellido}
              onChange={(e) => setFormApellido(e.target.value)}
            />
            <Input
              label="Nombre *"
              placeholder="Juan Carlos"
              value={formNombre}
              onChange={(e) => setFormNombre(e.target.value)}
            />
          </div>

          <Select
            label="Rol Institucional *"
            value={formRol}
            onChange={(e) => setFormRol(e.target.value)}
            options={[
              { value: 'Admin', label: 'Admin (Administrador General)' },
              { value: 'Dir Grl Inves Dllo', label: 'Dir Grl Inves Dllo' },
              { value: 'Dir Grl Mat', label: 'Dir Grl Mat' },
              { value: 'Dir Cont Fin - EMGE', label: 'Dir Cont Fin - EMGE' },
              { value: 'Cdo Guar Mil Bs AS', label: 'Cdo Guar Mil Bs AS' },
              { value: 'SUBJEMGE', label: 'SUBJEMGE' },
            ]}
          />
        </div>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            setUsuarios((prev) => prev.filter((u) => u.id !== userToDelete.id));
            setUserToDelete(null);
          }
        }}
        title="¿Desea eliminar este usuario?"
        message={
          userToDelete ? (
            <div>
              ¿Está seguro de que desea eliminar al usuario{' '}
              <span className="font-bold text-gray-900">
                {userToDelete.usuario}
              </span>{' '}
              ({userToDelete.apellido}, {userToDelete.nombre})?
            </div>
          ) : ''
        }
        detail={
          userToDelete
            ? `DNI: ${userToDelete.nroDocumento} - Rol: ${userToDelete.roles}. Esta acción no se puede deshacer.`
            : undefined
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};
