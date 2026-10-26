export interface ProyectoItem {
  id: number;
  nombre: string;
  jefeProyecto: string;
  asesorTecnico: string;
  asesorOperativo: string;
  descripcion: string;
  nivelMadurez: number | null;
  tipoProyecto: 'Finalizado' | 'Archivados' | 'Con Financiamiento' | 'En Estudio';
  porcentajeAvance: number;
}
