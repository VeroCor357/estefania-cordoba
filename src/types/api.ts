export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  buscar?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
