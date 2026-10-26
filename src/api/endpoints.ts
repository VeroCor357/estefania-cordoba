/**
 * ASP.NET Core C# Backend API Endpoints for SCGEA
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/perfil',
    REFRESH: '/auth/refresh',
  },
  OBJETIVOS: {
    METRICAS: (anio: number) => `/objetivos/dashboard-metricas?anio=${anio}`,
    LISTADO: '/objetivos/listado',
    OBTENER: (id: number) => `/objetivos/${id}`,
    CREAR: '/objetivos/crear',
    ACTUALIZAR: (id: number) => `/objetivos/actualizar/${id}`,
    ELIMINAR: (id: number) => `/objetivos/eliminar/${id}`,
    AVANCE: (id: number) => `/objetivos/${id}/avance`,
    DIRECCIONES: '/objetivos/direcciones',
  },
  PROYECTOS: {
    LISTADO: '/proyectos/listado',
    OBTENER: (id: number) => `/proyectos/${id}`,
    CREAR: '/proyectos/crear',
    ACTUALIZAR: (id: number) => `/proyectos/${id}`,
  },
  PRESUPUESTO: {
    ASIGNACIONES: '/presupuesto/asignaciones',
    RESUMEN: (anio: number) => `/presupuesto/resumen?anio=${anio}`,
  },
  ADMIN: {
    USUARIOS: '/admin/usuarios',
    ROLES: '/admin/roles',
    FUNCIONES: '/admin/funciones',
  },
} as const;
