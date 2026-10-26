import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { UsuarioItem, RolItem, FuncionItem } from '../types/admin';

const mockUsuariosInitial: UsuarioItem[] = [
  {
    id: 1,
    nombre: 'Estefania Verónica',
    apellido: 'CORDOBA',
    gradoMilitar: 'Ingeniera Militar',
    dni: '36.842.119',
    email: 'estefycordoba16@gmail.com',
    rol: 'Administrador General',
    dependencia: 'Centro de Producción de Software (CPS)',
    estado: 'Activo',
    ultimoAcceso: '2026-10-20 09:11',
  },
  {
    id: 2,
    nombre: 'Juan Manuel',
    apellido: 'PÉREZ',
    gradoMilitar: 'Coronel',
    dni: '24.120.304',
    email: 'jmperez@ejercito.mil.ar',
    rol: 'Supervisor de Proyectos',
    dependencia: 'Dirección General de Investigación y Desarrollo (DGIyD)',
    estado: 'Activo',
    ultimoAcceso: '2026-10-19 16:45',
  },
  {
    id: 3,
    nombre: 'Valeria',
    apellido: 'INSAURRALDE',
    gradoMilitar: 'Mayor',
    dni: '29.330.120',
    email: 'vinsaurralde@ejercito.mil.ar',
    rol: 'Operador DGIyD',
    dependencia: 'Dirección de Comunicaciones e Informática',
    estado: 'Activo',
    ultimoAcceso: '2026-10-18 11:20',
  },
  {
    id: 4,
    nombre: 'Carlos',
    apellido: 'BAZÁN',
    gradoMilitar: 'Teniente Coronel',
    dni: '26.490.871',
    email: 'cbazan@ejercito.mil.ar',
    rol: 'Auditor Financiero',
    dependencia: 'Dirección General de Planes, Programas y Presupuesto',
    estado: 'Activo',
    ultimoAcceso: '2026-10-15 14:05',
  },
];

const mockRolesInitial: RolItem[] = [
  {
    id: 1,
    codigo: 'ROLE_ADMIN',
    nombre: 'Administrador General',
    descripcion: 'Control total de parametrización, usuarios, objetivos institucionales y auditoría.',
    cantidadUsuarios: 3,
    nivelAcceso: 'Administrador',
  },
  {
    id: 2,
    codigo: 'ROLE_SUPERVISOR',
    nombre: 'Supervisor de Proyectos',
    descripcion: 'Aprobación de objetivos, revisión de avances técnicos y certificación de hitos.',
    cantidadUsuarios: 12,
    nivelAcceso: 'Supervisor',
  },
  {
    id: 3,
    codigo: 'ROLE_OPERADOR',
    nombre: 'Operador DGIyD',
    descripcion: 'Carga de objetivos, actualización de porcentajes de ejecución y solicitud de fondos.',
    cantidadUsuarios: 45,
    nivelAcceso: 'Operador',
  },
  {
    id: 4,
    codigo: 'ROLE_AUDITOR',
    nombre: 'Auditor Financiero',
    descripcion: 'Acceso a tableros presupuestarios consolidados, exportación de informes y trazabilidad.',
    cantidadUsuarios: 8,
    nivelAcceso: 'Lectura',
  },
];

const mockFuncionesInitial: FuncionItem[] = [
  {
    id: 1,
    modulo: 'Objetivos',
    codigo: 'OBJ_CREAR',
    nombre: 'Creación de Nuevos Objetivos',
    descripcion: 'Permite iniciar el asistente wizard de formulación de objetivos con o sin financiamiento.',
    habilitada: true,
  },
  {
    id: 2,
    modulo: 'Objetivos',
    codigo: 'OBJ_APROBAR',
    nombre: 'Aprobación Presupuestaria de Objetivos',
    descripcion: 'Validación de código BAPIN y afectación preventiva de créditos.',
    habilitada: true,
  },
  {
    id: 3,
    modulo: 'Proyectos',
    codigo: 'PROY_GESTION',
    nombre: 'Gestión de Matriz de Proyectos',
    descripcion: 'Administración de la matriz 3x2 de proyectos de I+D y niveles TRL.',
    habilitada: true,
  },
  {
    id: 4,
    modulo: 'Seguridad',
    codigo: 'SEC_AUDIT',
    nombre: 'Visualización de Logs de Auditoría',
    descripcion: 'Registro de accesos y modificaciones sensibles según directiva de ciberdefensa.',
    habilitada: true,
  },
];

let localUsuarios = [...mockUsuariosInitial];
let localRoles = [...mockRolesInitial];
let localFunciones = [...mockFuncionesInitial];

export const adminService = {
  getUsuarios: async (): Promise<UsuarioItem[]> => {
    try {
      const res = await apiClient.get<UsuarioItem[]>(API_ENDPOINTS.ADMIN.USUARIOS);
      return res.data;
    } catch {
      return localUsuarios;
    }
  },
  crearUsuario: async (payload: Partial<UsuarioItem>): Promise<UsuarioItem> => {
    const nuevo: UsuarioItem = {
      id: Date.now(),
      nombre: payload.nombre || '',
      apellido: payload.apellido || '',
      gradoMilitar: payload.gradoMilitar || 'Personal Civil',
      dni: payload.dni || '',
      email: payload.email || '',
      rol: payload.rol || 'Operador DGIyD',
      dependencia: payload.dependencia || 'DGIyD',
      estado: payload.estado || 'Activo',
      ultimoAcceso: 'Recién registrado',
    };
    localUsuarios.unshift(nuevo);
    return nuevo;
  },
  getRoles: async (): Promise<RolItem[]> => {
    try {
      const res = await apiClient.get<RolItem[]>(API_ENDPOINTS.ADMIN.ROLES);
      return res.data;
    } catch {
      return localRoles;
    }
  },
  getFunciones: async (): Promise<FuncionItem[]> => {
    try {
      const res = await apiClient.get<FuncionItem[]>(API_ENDPOINTS.ADMIN.FUNCIONES);
      return res.data;
    } catch {
      return localFunciones;
    }
  },
  toggleFuncion: async (id: number): Promise<FuncionItem> => {
    const item = localFunciones.find((f) => f.id === id);
    if (item) {
      item.habilitada = !item.habilitada;
      return { ...item };
    }
    throw new Error('Función no encontrada');
  },
};
