import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '../common/Button';

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  accessor?: (item: T) => any;
  sortable?: boolean;
  searchable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
  headerClassName?: string;
  render?: (value: any, item: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyField?: keyof T | ((item: T) => string | number);
  isLoading?: boolean;
  searchPlaceholder?: string;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  selectable?: boolean;
  selectedItems?: T[];
  onSelectionChange?: (selected: T[]) => void;
  renderRowActions?: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  title?: string;
  subtitle?: string;
  headerToolbar?: React.ReactNode;
  enableExport?: boolean;
  exportFileName?: string;
  className?: string;
  striped?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField = 'id',
  isLoading = false,
  searchPlaceholder = 'Buscar en la tabla...',
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  renderRowActions,
  emptyMessage = 'No se encontraron registros para mostrar.',
  title,
  subtitle,
  headerToolbar,
  enableExport = true,
  exportFileName = 'scgea_exportacion',
  className = '',
  striped = true,
  onRowClick,
}: DataTableProps<T>) {
  // State for search, sort and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Helper to extract key
  const getItemKey = (item: T, index: number): string | number => {
    if (typeof keyField === 'function') {
      return keyField(item);
    }
    return item[keyField] ?? index;
  };

  // Helper to get raw cell value
  const getCellValue = (item: T, col: ColumnDef<T>) => {
    if (col.accessor) {
      return col.accessor(item);
    }
    return item[col.key];
  };

  // Filter items based on searchTerm
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const query = searchTerm.toLowerCase().trim();

    return data.filter((item) => {
      // Search in searchable columns or all columns if none specified as searchable
      const searchableCols = columns.filter((col) => col.searchable !== false);
      const colsToSearch = searchableCols.length > 0 ? searchableCols : columns;

      return colsToSearch.some((col) => {
        const value = getCellValue(item, col);
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [data, searchTerm, columns]);

  // Sort items
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return filteredData;

    const column = columns.find((c) => c.key === sortKey);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = getCellValue(a, column);
      const valB = getCellValue(b, column);

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      // Handle numbers
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      // Handle boolean
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return sortDirection === 'asc' ? (valA === valB ? 0 : valA ? 1 : -1) : (valA === valB ? 0 : valA ? -1 : 1);
      }

      // Handle dates or date strings
      const dateA = Date.parse(String(valA));
      const dateB = Date.parse(String(valB));
      if (!isNaN(dateA) && !isNaN(dateB) && typeof valA === 'string' && valA.includes('-')) {
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Standard string comparison with Spanish locale
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortDirection === 'asc'
        ? strA.localeCompare(strB, 'es')
        : strB.localeCompare(strA, 'es');
    });
  }, [filteredData, sortKey, sortDirection, columns]);

  // Pagination calculation
  const totalRecords = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, safeCurrentPage, pageSize]);

  // Sort toggle handler
  const handleSort = (colKey: string, isSortable?: boolean) => {
    if (isSortable === false) return;

    if (sortKey !== colKey) {
      setSortKey(colKey);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortKey(null);
      setSortDirection(null);
    }
  };

  // Selection handlers
  const isAllSelected = useMemo(() => {
    if (paginatedData.length === 0 || !selectedItems) return false;
    return paginatedData.every((item) =>
      selectedItems.some((sel) => getItemKey(sel, 0) === getItemKey(item, 0))
    );
  }, [paginatedData, selectedItems]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return;
    if (e.target.checked) {
      // Add all current page items not already selected
      const newItems = [...selectedItems];
      paginatedData.forEach((item) => {
        if (!newItems.some((sel) => getItemKey(sel, 0) === getItemKey(item, 0))) {
          newItems.push(item);
        }
      });
      onSelectionChange(newItems);
    } else {
      // Remove all current page items
      const pageKeys = new Set(paginatedData.map((it, idx) => getItemKey(it, idx)));
      const newItems = selectedItems.filter(
        (sel, idx) => !pageKeys.has(getItemKey(sel, idx))
      );
      onSelectionChange(newItems);
    }
  };

  const handleSelectItem = (item: T) => {
    if (!onSelectionChange) return;
    const itemKey = getItemKey(item, 0);
    const isSelected = selectedItems.some((sel) => getItemKey(sel, 0) === itemKey);

    if (isSelected) {
      onSelectionChange(selectedItems.filter((sel) => getItemKey(sel, 0) !== itemKey));
    } else {
      onSelectionChange([...selectedItems, item]);
    }
  };

  // CSV Export handler
  const handleExportCSV = () => {
    if (sortedData.length === 0) return;

    const visibleCols = columns.filter((c) => c.key !== 'actions');
    const headers = visibleCols.map((c) => {
      if (typeof c.header === 'string') return c.header;
      return c.key;
    });

    const rows = sortedData.map((item) =>
      visibleCols.map((col) => {
        const val = getCellValue(item, col);
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      })
    );

    const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${exportFileName}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Page index range helper
  const startItem = totalRecords === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(safeCurrentPage * pageSize, totalRecords);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Top Header / Toolbar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          {title && <h3 className="text-base font-bold text-gray-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Quick search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full text-xs bg-white border border-gray-300 rounded-md pl-8 pr-7 py-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0c3b1e] focus:border-[#0c3b1e] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Export button */}
          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5 text-gray-600" />}
              onClick={handleExportCSV}
              disabled={sortedData.length === 0}
              title="Exportar a formato CSV / Excel"
            >
              Exportar
            </Button>
          )}

          {/* Custom toolbar buttons passed by parent */}
          {headerToolbar}
        </div>
      </div>

      {/* Table responsive viewport */}
      <div className="overflow-x-auto relative min-h-[220px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-3 border-[#0c3b1e] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-semibold text-[#0c3b1e] mt-2">Cargando datos institucionales...</span>
          </div>
        )}

        <table className="w-full text-left text-xs text-gray-700 border-collapse">
          {/* Table Header */}
          <thead className="bg-[#0c3b1e] text-white border-b border-[#0a2e18]">
            <tr>
              {selectable && (
                <th className="w-10 px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
              )}

              {columns.map((column) => {
                const isSorted = sortKey === column.key;
                const isSortable = column.sortable !== false;
                const alignClass =
                  column.align === 'center'
                    ? 'text-center'
                    : column.align === 'right'
                    ? 'text-right'
                    : 'text-left';

                return (
                  <th
                    key={column.key}
                    style={{ width: column.width }}
                    className={`px-3.5 py-3 font-semibold text-[11px] uppercase tracking-wider ${alignClass} ${
                      isSortable ? 'cursor-pointer hover:bg-[#114b27] select-none transition-colors' : ''
                    } ${column.headerClassName || ''}`}
                    onClick={() => isSortable && handleSort(column.key, column.sortable)}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        column.align === 'center'
                          ? 'justify-center'
                          : column.align === 'right'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <span>{column.header}</span>
                      {isSortable && (
                        <span className="text-emerald-300/80">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-emerald-300" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-emerald-300" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}

              {renderRowActions && (
                <th className="px-3.5 py-3 text-center font-semibold text-[11px] uppercase tracking-wider w-24">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {paginatedData.length === 0 && !isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (renderRowActions ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                      <Filter className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{emptyMessage}</p>
                    {searchTerm && (
                      <p className="text-xs text-gray-400 mt-1">
                        Pruebe ajustando o borrando el término de búsqueda actual.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => {
                const rowKey = getItemKey(item, rowIndex);
                const isSelected = selectedItems.some((sel) => getItemKey(sel, 0) === rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-emerald-50/70 hover:bg-emerald-50'
                        : striped && rowIndex % 2 === 1
                        ? 'bg-gray-50/60 hover:bg-gray-100/80'
                        : 'bg-white hover:bg-gray-50'
                    } ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {selectable && (
                      <td
                        className="w-10 px-3 py-2.5 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectItem(item)}
                          className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>
                    )}

                    {columns.map((column) => {
                      const value = getCellValue(item, column);
                      const alignClass =
                        column.align === 'center'
                          ? 'text-center'
                          : column.align === 'right'
                          ? 'text-right'
                          : 'text-left';

                      return (
                        <td
                          key={column.key}
                          className={`px-3.5 py-2.5 text-gray-800 ${alignClass} ${column.className || ''}`}
                        >
                          {column.render
                            ? column.render(value, item, rowIndex)
                            : value !== null && value !== undefined
                            ? String(value)
                            : '-'}
                        </td>
                      );
                    })}

                    {renderRowActions && (
                      <td
                        className="px-3.5 py-2.5 text-center whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {renderRowActions(item, rowIndex)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-3">
          <span>
            Mostrando <strong className="text-gray-900">{startItem}</strong> a{' '}
            <strong className="text-gray-900">{endItem}</strong> de{' '}
            <strong className="text-gray-900">{totalRecords}</strong> registros
          </span>

          <div className="flex items-center gap-1.5 border-l border-gray-300 pl-3">
            <label htmlFor="pageSizeSelect" className="text-gray-500">
              Filas por página:
            </label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0c3b1e]"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Page navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={safeCurrentPage <= 1}
            title="Primera página"
            className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={safeCurrentPage <= 1}
            title="Página anterior"
            className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (safeCurrentPage <= 3) {
                pageNum = i + 1;
              } else if (safeCurrentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = safeCurrentPage - 2 + i;
              }

              const isCurrent = pageNum === safeCurrentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-7 h-7 px-2 text-xs font-semibold rounded transition ${
                    isCurrent
                      ? 'bg-[#0c3b1e] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={safeCurrentPage >= totalPages}
            title="Página siguiente"
            className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={safeCurrentPage >= totalPages}
            title="Última página"
            className="p-1.5 rounded hover:bg-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
