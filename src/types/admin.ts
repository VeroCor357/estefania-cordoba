export interface UsuarioItem {
  id: number;
  nombre: string;
  apellido: string;
  gradoMilitar?: string;
  dni: string;
  email: string;
  rol: string;
  dependencia: string;
  estado: 'Activo' | 'Inactivo';
  ultimoAcceso: string;
}

export interface RolItem {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  cantidadUsuarios: number;
  nivelAcceso: 'Lectura' | 'Operador' | 'Supervisor' | 'Administrador';
}

export interface FuncionItem {
  id: number;
  modulo: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  habilitada: boolean;
}
