import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { ProyectoItem } from '../types/proyectos';

const mockProyectosInitial: ProyectoItem[] = [
  {
    id: 1,
    nombre: 'Modernización Blindados TAM 2C-A2',
    jefeProyecto: 'CR PÉREZ, Marcelo',
    asesorTecnico: 'ING MIL SUÁREZ, Hernán',
    asesorOperativo: 'MY DÍAZ, Esteban',
    descripcion: 'Integración de termografía de última generación y estabilización digital de puntería.',
    nivelMadurez: 8,
    tipoProyecto: 'Con Financiamiento',
    porcentajeAvance: 78,
  },
  {
    id: 2,
    nombre: 'Sistema C2 Táctico de Campaña SITEA',
    jefeProyecto: 'TC BENÍTEZ, Claudia',
    asesorTecnico: 'CAP QUIROGA, Javier',
    asesorOperativo: 'MY LÓPEZ, Germán',
    descripcion: 'Red militar mallada ad-hoc con encriptación nacional y geoposicionamiento diferencial.',
    nivelMadurez: 7,
    tipoProyecto: 'Con Financiamiento',
    porcentajeAvance: 85,
  },
  {
    id: 3,
    nombre: 'Radar Táctico de Vigilancia Terrestre RASTREADOR II',
    jefeProyecto: 'MY ROJAS, Leonardo',
    asesorTecnico: 'ING MIL GOROSITO, Andrea',
    asesorOperativo: 'TC MANSILLA, Federico',
    descripcion: 'Detección automática de blancos móviles y clasificación con procesamiento de señales Doppler.',
    nivelMadurez: 9,
    tipoProyecto: 'Finalizado',
    porcentajeAvance: 100,
  },
  {
    id: 4,
    nombre: 'Vehículo Blindado a Rueda 8x8 Guaraní / Pandur',
    jefeProyecto: 'CR FERRERO, Jorge',
    asesorTecnico: 'TC BLANCO, Mariano',
    asesorOperativo: 'CR PÉREZ, Marcelo',
    descripcion: 'Evaluación técnico-operacional y ensayos balísticos de blindaje compuesto.',
    nivelMadurez: 4,
    tipoProyecto: 'En Estudio',
    porcentajeAvance: 35,
  },
  {
    id: 5,
    nombre: 'Dron Táctico de Exploración y Designación LIPÁN V',
    jefeProyecto: 'MY ACOSTA, Rodrigo',
    asesorTecnico: 'ING ALDERETE, Sofia',
    asesorOperativo: 'CAP VÁZQUEZ, Mauro',
    descripcion: 'UAV clase II con autonomía extendida de 12 horas y carga útil optrónica giroscópica.',
    nivelMadurez: 6,
    tipoProyecto: 'Archivados',
    porcentajeAvance: 50,
  },
];

let localProyectos = [...mockProyectosInitial];

export const proyectosService = {
  getProyectos: async (): Promise<ProyectoItem[]> => {
    try {
      const response = await apiClient.get<ProyectoItem[]>(API_ENDPOINTS.PROYECTOS.LISTADO);
      return response.data;
    } catch {
      return localProyectos;
    }
  },

  crearProyecto: async (payload: Partial<ProyectoItem>): Promise<ProyectoItem> => {
    try {
      const response = await apiClient.post<ProyectoItem>(API_ENDPOINTS.PROYECTOS.CREAR, payload);
      return response.data;
    } catch {
      const nuevo: ProyectoItem = {
        id: Date.now(),
        nombre: payload.nombre || 'Nuevo Proyecto',
        jefeProyecto: payload.jefeProyecto || '',
        asesorTecnico: payload.asesorTecnico || '',
        asesorOperativo: payload.asesorOperativo || '',
        descripcion: payload.descripcion || '',
        nivelMadurez: payload.nivelMadurez ?? 1,
        tipoProyecto: payload.tipoProyecto || 'En Estudio',
        porcentajeAvance: payload.porcentajeAvance || 0,
      };
      localProyectos.unshift(nuevo);
      return nuevo;
    }
  },
};
