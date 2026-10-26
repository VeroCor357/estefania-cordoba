export interface ObjetivoItem {
  id: number;
  ordenPrioridad: number;
  tipoObjetivo: 'Con Financiamiento' | 'Sin Financiamiento';
  esPrioritario: boolean;
  nombre: string;
  descripcion: string;
  responsable: string;
  porcentajeEjecucion: number;
  presupuestoEjecutado: number;
  presupuestoAsignado: number;
  fechaUltimoAvance: string | null;
  motivos?: string;
  tieneBapin?: boolean;
  estaAprobado?: boolean;
  estaVigente?: boolean;
  direccion?: string;
  trimestre?: string;
  fuenteFinanciamiento?: string;
}

export interface DashboardMetricas {
  anio: number;
  ejecutadosMonto: number;
  noEjecutadosMonto: number;
  sinFinanciamientoMonto: number;
  totalGeneralMonto: number;
  porcentajeEjecucion: number;
}

export interface ObjetivoFilterParams {
  anio: number;
  tipoObjetivo?: string;
  direccion?: string;
  ordenPrioridad?: number;
  estadoEjecucion?: string;
  trimestre?: string;
  fuenteFinanciamiento?: string;
  buscar?: string;
  page: number;
  pageSize: number;
}
