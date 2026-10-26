import React, { useState, useEffect } from 'react';
import { objetivosService } from '../services/objetivosService';
import { ObjetivoItem } from '../types/objetivos';
import { DataTable, ColumnDef } from '../components/data-display/DataTable';
import { ProgressBar } from '../components/data-display/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { Filter, RefreshCw } from 'lucide-react';

export const DashboardDGIyD: React.FC = () => {
  const [objetivos, setObjetivos] = useState<ObjetivoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [direccion, setDireccion] = useState<string>('TODAS');
  const [tipoObjetivo, setTipoObjetivo] = useState<string>('TODOS');
  const [trimestre, setTrimestre] = useState<string>('TODOS');

  const fetchObjetivos = async () => {
    setIsLoading(true);
    try {
      const res = await objetivosService.getObjetivos({
        anio: 2026,
        direccion: direccion !== 'TODAS' ? direccion : undefined,
        tipoObjetivo: tipoObjetivo !== 'TODOS' ? tipoObjetivo : undefined,
        page: 1,
        pageSize: 100,
      });

      let list = res.data;
      if (trimestre !== 'TODOS') {
        list = list.filter((o) => o.trimestre === trimestre);
      }
      setObjetivos(list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObjetivos();
  }, [direccion, tipoObjetivo, trimestre]);

  const columns: ColumnDef<ObjetivoItem>[] = [
    {
      key: 'ordenPrioridad',
      header: 'Prioridad',
      width: '80px',
      align: 'center',
      render: (val) => <span className="font-bold text-gray-800">#{val}</span>,
    },
    {
      key: 'nombre',
      header: 'Objetivo Institucional',
      className: 'font-semibold',
    },
    {
      key: 'direccion',
      header: 'Dirección',
      width: '120px',
      render: (val) => (
        <span className="font-medium text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-700">
          {val || 'DGIyD'}
        </span>
      ),
    },
    {
      key: 'tipoObjetivo',
      header: 'Tipo',
      width: '150px',
      render: (val) => (
        <Badge variant={val === 'Con Financiamiento' ? 'success' : 'warning'} size="sm">
          {val}
        </Badge>
      ),
    },
    {
      key: 'trimestre',
      header: 'Trimestre',
      width: '110px',
      render: (val) => <span className="text-xs text-gray-600">{val || '3er Trimestre'}</span>,
    },
    {
      key: 'porcentajeEjecucion',
      header: 'Ejecución',
      width: '120px',
      render: (val) => <ProgressBar value={val} size="sm" />,
    },
    {
      key: 'presupuestoAsignado',
      header: 'Presupuesto Asignado',
      align: 'right',
      render: (val) => <span className="font-bold text-gray-900">{formatCurrency(val)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            Dirección General de Investigación y Desarrollo (DGIyD)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Vista especializada con filtros de unidades orgánicas, financiamiento y trimestres
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={fetchObjetivos}
        >
          Actualizar Vista
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-gray-700">
          <Filter className="w-4 h-4 text-[#0c3b1e]" />
          <span>Filtros Institucionales:</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-500 font-medium">Dirección:</label>
          <select
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-800 font-medium focus:ring-1 focus:ring-[#0c3b1e] focus:outline-none"
          >
            <option value="TODAS">Todas las Direcciones</option>
            <option value="DGIyD">DGIyD (Inv. y Desarrollo)</option>
            <option value="Dir Com">Dir Com (Comunicaciones)</option>
            <option value="Dir Av Ej">Dir Av Ej (Aviación)</option>
            <option value="Dir Arsenales">Dir Arsenales</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-500 font-medium">Financiamiento:</label>
          <select
            value={tipoObjetivo}
            onChange={(e) => setTipoObjetivo(e.target.value)}
            className="border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-800 font-medium focus:ring-1 focus:ring-[#0c3b1e] focus:outline-none"
          >
            <option value="TODOS">Todos los Tipos</option>
            <option value="Con Financiamiento">Con Financiamiento</option>
            <option value="Sin Financiamiento">Sin Financiamiento</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-500 font-medium">Trimestre:</label>
          <select
            value={trimestre}
            onChange={(e) => setTrimestre(e.target.value)}
            className="border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-800 font-medium focus:ring-1 focus:ring-[#0c3b1e] focus:outline-none"
          >
            <option value="TODOS">Todos los Trimestres</option>
            <option value="1er Trimestre">1er Trimestre</option>
            <option value="2do Trimestre">2do Trimestre</option>
            <option value="3er Trimestre">3er Trimestre</option>
            <option value="4to Trimestre">4to Trimestre</option>
          </select>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable<ObjetivoItem>
        title="Matriz de Seguimiento DGIyD"
        subtitle={`Total registros filtrados: ${objetivos.length}`}
        data={objetivos}
        columns={columns}
        keyField="id"
        isLoading={isLoading}
        searchPlaceholder="Filtrar por denominación o responsable..."
        defaultPageSize={10}
        exportFileName="scgea_dgiyd_objetivos"
      />
    </div>
  );
};
