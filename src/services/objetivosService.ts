import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import {
  ObjetivoItem,
  DashboardMetricas,
  ObjetivoFilterParams,
} from '../types/objetivos';

// Initial realistic data reflecting Argentine Army (Ejército Argentino)
const mockObjetivosInitial: ObjetivoItem[] = [
  {
    id: 101,
    ordenPrioridad: 1,
    tipoObjetivo: 'Con Financiamiento',
    esPrioritario: true,
    nombre: 'Modernización del Parque de Vehículos a Rueda TAM 2C y VCBR',
    descripcion: 'Actualización de sistemas optrónicos, torres de tiro y modernización integral de bateas blindadas.',
    responsable: 'CR Juan Manuel PÉREZ (DGIyD)',
    porcentajeEjecucion: 74,
    presupuestoEjecutado: 807445600,
    presupuestoAsignado: 1091142708,
    fechaUltimoAvance: '2026-09-15',
    tieneBapin: true,
    estaAprobado: true,
    estaVigente: true,
    direccion: 'DGIyD',
    trimestre: '3er Trimestre',
    fuenteFinanciamiento: 'FONDEF',
  },
  {
    id: 102,
    ordenPrioridad: 2,
    tipoObjetivo: 'Con Financiamiento',
    esPrioritario: true,
    nombre: 'Implementación del Sistema Táctico de Comando y Control (SITEA)',
    descripcion: 'Despliegue del software operacional conjunto en brigadas mecanizadas y puestos de comando móviles.',
    responsable: 'MY Valeria INSAURRALDE (Dir Com)',
    porcentajeEjecucion: 88,
    presupuestoEjecutado: 450200000,
    presupuestoAsignado: 512000000,
    fechaUltimoAvance: '2026-10-02',
    tieneBapin: true,
    estaAprobado: true,
    estaVigente: true,
    direccion: 'Dir Com',
    trimestre: '4to Trimestre',
    fuenteFinanciamiento: 'Tesoro Nacional',
  },
  {
    id: 103,
    ordenPrioridad: 3,
    tipoObjetivo: 'Con Financiamiento',
    esPrioritario: false,
    nombre: 'Adquisición y Recuperación de Helicópteros Bell UH-1H II Huey II',
    descripcion: 'Mantenimiento mayor nivel escalón IV y provisión de repuestos para unidades de Aviación de Ejército.',
    responsable: 'TC Martín GÓMEZ (Dir Av Ej)',
    porcentajeEjecucion: 62,
    presupuestoEjecutado: 630000000,
    presupuestoAsignado: 1015000000,
    fechaUltimoAvance: '2026-08-20',
    tieneBapin: true,
    estaAprobado: true,
    estaVigente: true,
    direccion: 'Dir Av Ej',
    trimestre: '3er Trimestre',
    fuenteFinanciamiento: 'FONDEF',
  },
  {
    id: 104,
    ordenPrioridad: 4,
    tipoObjetivo: 'Sin Financiamiento',
    esPrioritario: false,
    nombre: 'Simulador Virtual de Tiro de Artillería Autopropulsada VCA Palmaria',
    descripcion: 'Desarrollo de domo interactivo con balística computada y simulación de condiciones climáticas.',
    responsable: 'CAP Diego ALONSO (CIE)',
    porcentajeEjecucion: 30,
    presupuestoEjecutado: 0,
    presupuestoAsignado: 185000000,
    fechaUltimoAvance: '2026-05-11',
    tieneBapin: false,
    estaAprobado: false,
    estaVigente: true,
    direccion: 'DGIyD',
    trimestre: '2do Trimestre',
    fuenteFinanciamiento: 'En Gestión',
  },
  {
    id: 105,
    ordenPrioridad: 5,
    tipoObjetivo: 'Con Financiamiento',
    esPrioritario: true,
    nombre: 'Equipamiento Individual de Campaña y Protección Balística Nivel IV',
    descripcion: 'Provisión reglamentaria de chalecos modulares, cascos de aramida y ópticas nocturnas.',
    responsable: 'MY Roberto SOLÍS (Dir Arsenales)',
    porcentajeEjecucion: 95,
    presupuestoEjecutado: 940000000,
    presupuestoAsignado: 989000000,
    fechaUltimoAvance: '2026-10-14',
    tieneBapin: true,
    estaAprobado: true,
    estaVigente: true,
    direccion: 'Dir Arsenales',
    trimestre: '4to Trimestre',
    fuenteFinanciamiento: 'FONDEF',
  },
  {
    id: 106,
    ordenPrioridad: 6,
    tipoObjetivo: 'Sin Financiamiento',
    esPrioritario: false,
    nombre: 'Plataforma Autónoma no Tripulada de Exploración Terrestre (UGV-EA)',
    descripcion: 'Prototipo robótico de reconocimiento todoterreno con sensores infrarrojos y enlace de datos cifrado.',
    responsable: 'ING Mil Estefania CORDOBA (CPS)',
    porcentajeEjecucion: 15,
    presupuestoEjecutado: 0,
    presupuestoAsignado: 95000000,
    fechaUltimoAvance: '2026-04-18',
    tieneBapin: false,
    estaAprobado: false,
    estaVigente: true,
    direccion: 'DGIyD',
    trimestre: '1er Trimestre',
    fuenteFinanciamiento: 'En Gestión',
  },
];

let localObjetivos: ObjetivoItem[] = [...mockObjetivosInitial];

export const objetivosService = {
  // GET: /api/v1/objetivos/dashboard-metricas?anio=2026
  getMetricas: async (anio: number): Promise<DashboardMetricas> => {
    try {
      const response = await apiClient.get<DashboardMetricas>(API_ENDPOINTS.OBJETIVOS.METRICAS(anio));
      return response.data;
    } catch {
      // Cálculo dinámico local en caso de desconexión con el servidor ASP.NET
      const conFinanciamiento = localObjetivos.filter((o) => o.tipoObjetivo === 'Con Financiamiento');
      const sinFinanciamiento = localObjetivos.filter((o) => o.tipoObjetivo === 'Sin Financiamiento');

      const ejecutadosMonto = conFinanciamiento.reduce((sum, o) => sum + (o.presupuestoEjecutado || 0), 0);
      const totalConFinanciamiento = conFinanciamiento.reduce((sum, o) => sum + (o.presupuestoAsignado || 0), 0);
      const noEjecutadosMonto = Math.max(0, totalConFinanciamiento - ejecutadosMonto);
      const sinFinanciamientoMonto = sinFinanciamiento.reduce((sum, o) => sum + (o.presupuestoAsignado || 0), 0);
      const totalGeneralMonto = totalConFinanciamiento + sinFinanciamientoMonto;
      const porcentajeEjecucion = totalConFinanciamiento > 0 ? Math.round((ejecutadosMonto / totalConFinanciamiento) * 100) : 0;

      return {
        anio,
        ejecutadosMonto,
        noEjecutadosMonto,
        sinFinanciamientoMonto,
        totalGeneralMonto,
        porcentajeEjecucion,
      };
    }
  },

  // GET: /api/v1/objetivos/listado
  getObjetivos: async (filters: ObjetivoFilterParams) => {
    try {
      const response = await apiClient.get<{
        data: ObjetivoItem[];
        totalRecords: number;
        totalPages: number;
        currentPage: number;
      }>(API_ENDPOINTS.OBJETIVOS.LISTADO, { params: filters });
      return response.data;
    } catch {
      // Filtrado local inteligente
      let result = [...localObjetivos];

      if (filters.tipoObjetivo) {
        result = result.filter((o) => o.tipoObjetivo === filters.tipoObjetivo);
      }
      if (filters.direccion) {
        result = result.filter((o) => o.direccion === filters.direccion);
      }
      if (filters.buscar) {
        const q = filters.buscar.toLowerCase();
        result = result.filter(
          (o) =>
            o.nombre.toLowerCase().includes(q) ||
            o.responsable.toLowerCase().includes(q) ||
            o.descripcion.toLowerCase().includes(q)
        );
      }

      const totalRecords = result.length;
      const pageSize = filters.pageSize || 10;
      const page = filters.page || 1;
      const startIndex = (page - 1) * pageSize;
      const paginated = result.slice(startIndex, startIndex + pageSize);

      return {
        data: paginated,
        totalRecords,
        totalPages: Math.ceil(totalRecords / pageSize),
        currentPage: page,
      };
    }
  },

  // GET: /api/v1/objetivos/{id}
  getObjetivoPorId: async (id: number): Promise<ObjetivoItem | undefined> => {
    try {
      const response = await apiClient.get<ObjetivoItem>(API_ENDPOINTS.OBJETIVOS.OBTENER(id));
      return response.data;
    } catch {
      return localObjetivos.find((o) => o.id === id);
    }
  },

  // POST: /api/v1/objetivos/crear
  crearObjetivo: async (payload: Partial<ObjetivoItem>): Promise<ObjetivoItem> => {
    try {
      const response = await apiClient.post<ObjetivoItem>(API_ENDPOINTS.OBJETIVOS.CREAR, payload);
      return response.data;
    } catch {
      const newObj: ObjetivoItem = {
        id: Date.now(),
        ordenPrioridad: payload.ordenPrioridad || localObjetivos.length + 1,
        tipoObjetivo: payload.tipoObjetivo || 'Con Financiamiento',
        esPrioritario: payload.esPrioritario ?? true,
        nombre: payload.nombre || 'Nuevo Objetivo',
        descripcion: payload.descripcion || '',
        responsable: payload.responsable || 'Oficial Responsable',
        porcentajeEjecucion: payload.porcentajeEjecucion || 0,
        presupuestoEjecutado: payload.presupuestoEjecutado || 0,
        presupuestoAsignado: payload.presupuestoAsignado || 0,
        fechaUltimoAvance: new Date().toISOString().slice(0, 10),
        tieneBapin: payload.tieneBapin ?? false,
        estaAprobado: payload.estaAprobado ?? false,
        estaVigente: true,
        direccion: payload.direccion || 'DGIyD',
        trimestre: payload.trimestre || '1er Trimestre',
        fuenteFinanciamiento: payload.fuenteFinanciamiento || 'FONDEF',
      };
      localObjetivos.unshift(newObj);
      return newObj;
    }
  },

  // PUT: /api/v1/objetivos/actualizar/{id}
  actualizarObjetivo: async (id: number, payload: Partial<ObjetivoItem>): Promise<ObjetivoItem> => {
    try {
      const response = await apiClient.put<ObjetivoItem>(API_ENDPOINTS.OBJETIVOS.ACTUALIZAR(id), payload);
      return response.data;
    } catch {
      const idx = localObjetivos.findIndex((o) => o.id === id);
      if (idx !== -1) {
        localObjetivos[idx] = { ...localObjetivos[idx], ...payload };
        return localObjetivos[idx];
      }
      throw new Error('Objetivo no encontrado');
    }
  },

  // DELETE: /api/v1/objetivos/eliminar/{id}
  eliminarObjetivo: async (id: number): Promise<boolean> => {
    try {
      await apiClient.delete(API_ENDPOINTS.OBJETIVOS.ELIMINAR(id));
      return true;
    } catch {
      localObjetivos = localObjetivos.filter((o) => o.id !== id);
      return true;
    }
  },
};
