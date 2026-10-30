import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Menu,
  Check,
  SquarePen,
  ChevronDown,
  Save,
  Plus,
  Trash2,
} from 'lucide-react';
import { mockObjetivosListado } from './GeneracionObjetivos';

interface MetaTrimestral {
  id: number;
  nombre: string;
  trimestre: string;
  presupuesto: string;
  porcentaje: string;
  ejecutado: 'Si' | 'No';
}

const defaultMetas: MetaTrimestral[] = [
  {
    id: 1,
    nombre: 'Adquisición de Equipamiento Biomédico 1er Trimestre',
    trimestre: 'Trimestre 1',
    presupuesto: '$ 614.693.391,00',
    porcentaje: '43%',
    ejecutado: 'Si',
  },
  {
    id: 2,
    nombre: 'Adquisición de Equipamiento Biomédico 3er Trimestre',
    trimestre: 'Trimestre 3',
    presupuesto: '$ 50.539.177,00',
    porcentaje: '4%',
    ejecutado: 'Si',
  },
  {
    id: 3,
    nombre: 'Adquisición de Equipamiento Biomédico 4to Trimestre',
    trimestre: 'Trimestre 3',
    presupuesto: '$ 749.767.430,00',
    porcentaje: '53%',
    ejecutado: 'No',
  },
];

export const EditarObjetivoView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  // Initial step: default to 3 (Revisión) to match the user's screenshot
  const initialStep = searchParams.get('step') ? Number(searchParams.get('step')) : 3;
  const [step, setStep] = useState<number>(initialStep);

  // Form State initialized to match screenshot image_4275278f.png & image_92c5d526.png
  const [formData, setFormData] = useState({
    nombre: 'Reposición de Equipamiento Biomédico (Inciso 4)',
    direccionCargo: 'DIRECCIÓN GENERAL DE SALUD',
    elementoDependiente: '',
    fechaDesde: '01/01/2026',
    fechaHasta: '31/12/2026',
    conFinanciamiento: 'Si',
    moneda: 'Pesos',
    presupuesto: '$ 1.415.000.000,00',
    fuenteFinanciamiento: 'Fuente 11',
    ordenPrioridad: '0',
    descripcion:
      'Reposición programada e integral de equipamiento biomédico crítico para hospitales militares y centros asistenciales.',
    tieneBapin: true,
    estaAprobado: true,
    estaVigente: true,
  });

  const [metas, setMetas] = useState<MetaTrimestral[]>(defaultMetas);

  useEffect(() => {
    if (id) {
      const match = mockObjetivosListado.find((o) => o.id === Number(id));
      if (match) {
        setFormData((prev) => ({
          ...prev,
          nombre: match.nombre,
          direccionCargo: match.direccionCargo,
          fechaDesde: match.fechaDesde || prev.fechaDesde,
          fechaHasta: match.fechaHasta || prev.fechaHasta,
        }));
      }
    }
  }, [id]);

  // Computed total percent
  const totalPresupuesto = useMemo(() => {
    return '$ 1.415.000.000,00';
  }, []);

  return (
    <div className="w-full pb-10">
      {/* 1. Header superior: ← Editar objetivo */}
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          onClick={() => navigate('/generacion-objetivos')}
          className="inline-flex items-center gap-1.5 text-[#1b4353] hover:text-[#0f2833] font-bold text-xs tracking-tight transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Editar objetivo</span>
        </button>
      </div>

      {/* 2. Título Central: Editar Objetivo + Nombre del Objetivo */}
      <div className="text-center my-3">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Editar Objetivo
        </h1>
        <h2 className="text-base sm:text-lg font-bold text-[#1e293b] mt-1">
          {formData.nombre}
        </h2>
      </div>

      {/* 3. Stepper con 3 pasos (Datos, Estructura, Revisión) */}
      <div className="max-w-md mx-auto my-6 px-2">
        <div className="relative flex items-center justify-between">
          {/* Línea conectora */}
          <div className="absolute left-6 right-6 top-4.5 h-[2px] bg-[#d1d5db] -z-0">
            <div
              className="h-full bg-[#1e293b] transition-all duration-300"
              style={{
                width: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
              }}
            />
          </div>

          {/* Paso 1: Datos */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer shadow-xs ${
                step >= 1 ? 'bg-[#1e293b] text-white' : 'bg-[#cbd5e1] text-white'
              }`}
            >
              <User className="w-4 h-4" />
            </button>
            <span
              className={`mt-2 text-[11px] transition ${
                step === 1 ? 'font-bold text-gray-900' : 'font-medium text-gray-500'
              }`}
            >
              Datos
            </span>
          </div>

          {/* Paso 2: Estructura */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer shadow-xs ${
                step >= 2 ? 'bg-[#1e293b] text-white' : 'bg-[#cbd5e1] text-white'
              }`}
            >
              <Menu className="w-4 h-4" />
            </button>
            <span
              className={`mt-2 text-[11px] transition ${
                step === 2 ? 'font-bold text-gray-900' : 'font-medium text-gray-500'
              }`}
            >
              Estructura
            </span>
          </div>

          {/* Paso 3: Revisión */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer shadow-xs ${
                step >= 3 ? 'bg-[#1e293b] text-white' : 'bg-[#cbd5e1] text-white'
              }`}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span
              className={`mt-2 text-[11px] transition ${
                step === 3 ? 'font-bold text-gray-900' : 'font-medium text-gray-500'
              }`}
            >
              Revisión
            </span>
          </div>
        </div>
      </div>

      {/* 4. Tarjeta Principal con borde superior oscuro #1e293b */}
      <div className="max-w-3xl mx-auto bg-white rounded-none border-t-4 border-[#1e293b] shadow-xs p-6 sm:p-10 mb-6">
        {/* ===================== PASO 1: DATOS DEL OBJETIVO ===================== */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#1e293b]">Datos del objetivo</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nombre<span className="text-[#c0392b]">*</span>
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Dirección a Cargo
              </label>
              <div className="relative">
                <select
                  value={formData.direccionCargo}
                  onChange={(e) =>
                    setFormData({ ...formData, direccionCargo: e.target.value })
                  }
                  className="w-full bg-[#efeff0] text-gray-700 text-xs rounded-none py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                >
                  <option value="DIRECCIÓN GENERAL DE SALUD">DIRECCIÓN GENERAL DE SALUD</option>
                  <option value="DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO">
                    DIRECCIÓN GENERAL DE INVESTIGACIÓN Y DESARROLLO
                  </option>
                  <option value="DIRECCIÓN GENERAL DE MATERIAL">DIRECCIÓN GENERAL DE MATERIAL</option>
                  <option value="DIRECCIÓN DE ARSENALES">DIRECCIÓN DE ARSENALES</option>
                  <option value="Cdo Guar Mil Bs As">Cdo Guar Mil Bs As</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Elemento Dependiente
              </label>
              <input
                type="text"
                value={formData.elementoDependiente}
                onChange={(e) =>
                  setFormData({ ...formData, elementoDependiente: e.target.value })
                }
                placeholder="Opcional"
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Fecha desde<span className="text-[#c0392b]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fechaDesde}
                  onChange={(e) => setFormData({ ...formData, fechaDesde: e.target.value })}
                  className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Fecha hasta<span className="text-[#c0392b]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fechaHasta}
                  onChange={(e) => setFormData({ ...formData, fechaHasta: e.target.value })}
                  className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Con Financiamiento
                </label>
                <select
                  value={formData.conFinanciamiento}
                  onChange={(e) =>
                    setFormData({ ...formData, conFinanciamiento: e.target.value })
                  }
                  className="w-full bg-[#efeff0] text-gray-700 text-xs py-2 px-3"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Moneda*</label>
                <select
                  value={formData.moneda}
                  onChange={(e) => setFormData({ ...formData, moneda: e.target.value })}
                  className="w-full bg-[#efeff0] text-gray-700 text-xs py-2 px-3"
                >
                  <option value="Pesos">Pesos</option>
                  <option value="Dólares">Dólares</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Presupuesto*
                </label>
                <input
                  type="text"
                  value={formData.presupuesto}
                  onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                  className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Fuente de Financiamiento*
              </label>
              <select
                value={formData.fuenteFinanciamiento}
                onChange={(e) =>
                  setFormData({ ...formData, fuenteFinanciamiento: e.target.value })
                }
                className="w-full bg-[#efeff0] text-gray-700 text-xs py-2 px-3"
              >
                <option value="Fuente 11">Fuente 11 (Tesoro Nacional)</option>
                <option value="Fuente 12">Fuente 12 (Recursos Propios)</option>
                <option value="Fuente 22">Fuente 22 (Crédito Externo / FONDEF)</option>
              </select>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/generacion-objetivos')}
                className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2 rounded bg-[#00a8cc] hover:bg-[#0092b3] text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 2: ESTRUCTURA ===================== */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#1e293b]">Estructura del objetivo</h3>
              <p className="text-xs text-gray-500 mt-1">
                Definición y desglose de metas por trimestre
              </p>
            </div>

            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#f8fafc] text-gray-600 font-bold border-y border-gray-200">
                    <tr>
                      <th className="px-3 py-2">Nombre</th>
                      <th className="px-3 py-2 text-center">Trimestre</th>
                      <th className="px-3 py-2 text-right">Presupuesto</th>
                      <th className="px-3 py-2 text-center">%</th>
                      <th className="px-3 py-2 text-center">Ejecutado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {metas.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2 text-gray-800 font-medium">{m.nombre}</td>
                        <td className="px-3 py-2 text-center text-gray-600">{m.trimestre}</td>
                        <td className="px-3 py-2 text-right text-gray-800 font-mono">
                          {m.presupuesto}
                        </td>
                        <td className="px-3 py-2 text-center font-bold text-emerald-700">
                          {m.porcentaje}
                        </td>
                        <td className="px-3 py-2 text-center font-semibold">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] ${
                              m.ejecutado === 'Si'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {m.ejecutado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-xs transition cursor-pointer"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2 rounded bg-[#00a8cc] hover:bg-[#0092b3] text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                Ir a Revisión
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: REVISIÓN (IDÉNTICO A LAS CAPTURAS) ===================== */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Título de la tarjeta */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#1e293b]">Revisión</h3>
            </div>

            {/* Sección: Objetivo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-semibold text-gray-500 tracking-wide">
                  Objetivo
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  title="Editar objetivo"
                  className="w-5 h-5 rounded bg-[#f59e0b] hover:bg-[#d97706] text-white flex items-center justify-center transition shadow-2xs cursor-pointer"
                >
                  <SquarePen className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>

              {/* Dirección a cargo */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Dirección a cargo
                </label>
                <div className="w-full bg-[#efeff0] text-gray-700 text-xs px-3 py-2 rounded-none border border-transparent">
                  {formData.direccionCargo}
                </div>
              </div>

              {/* Elemento Dependiente */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Elemento Dependiente
                </label>
                <div className="w-full bg-[#efeff0] text-gray-700 text-xs px-3 py-2 rounded-none border border-transparent min-h-[34px]">
                  {formData.elementoDependiente || '\u00A0'}
                </div>
              </div>

              {/* Fecha desde / Fecha hasta */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-700">Fecha desde</span>
                  <div className="bg-[#efeff0] text-gray-700 text-xs px-4 py-1.5 rounded-none">
                    {formData.fechaDesde}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-700">Fecha hasta</span>
                  <div className="bg-[#efeff0] text-gray-700 text-xs px-4 py-1.5 rounded-none">
                    {formData.fechaHasta}
                  </div>
                </div>
              </div>

              {/* Con Financiamiento / Moneda / Presupuesto */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-700">Con Financiamiento</span>
                  <div className="bg-[#efeff0] text-gray-700 text-xs px-4 py-1.5 rounded-none w-28">
                    {formData.conFinanciamiento}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-700">Moneda</span>
                  <div className="bg-[#efeff0] text-gray-700 text-xs px-4 py-1.5 rounded-none w-32">
                    {formData.moneda}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-700">Presupuesto</span>
                  <div className="bg-[#efeff0] text-gray-700 text-xs px-4 py-1.5 rounded-none min-w-[150px]">
                    {formData.presupuesto}
                  </div>
                </div>
              </div>

              {/* Fuente de Financiamiento */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                    Fuente de Financiamiento
                  </span>
                  <div className="bg-[#efeff0] text-gray-700 text-xs px-4 py-1.5 rounded-none flex-1">
                    {formData.fuenteFinanciamiento}
                  </div>
                </div>
              </div>
            </div>

            {/* Sección: Organización definitiva */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-semibold text-gray-500 tracking-wide">
                  Organización definitiva
                </span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  title="Editar organización definitiva"
                  className="w-5 h-5 rounded bg-[#f59e0b] hover:bg-[#d97706] text-white flex items-center justify-center transition shadow-2xs cursor-pointer"
                >
                  <SquarePen className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>

              {/* Tabla idéntica a image_92c5d526.png */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="text-gray-600 font-bold border-b border-gray-200">
                      <th className="py-2.5 px-3">Nombre</th>
                      <th className="py-2.5 px-3">Trimestre</th>
                      <th className="py-2.5 px-3 text-right sm:text-left">Presupuesto</th>
                      <th className="py-2.5 px-3 text-center">%</th>
                      <th className="py-2.5 px-3 text-center">Ejecutado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-500">
                    {metas.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="py-3 px-3 text-gray-700">{item.nombre}</td>
                        <td className="py-3 px-3">{item.trimestre}</td>
                        <td className="py-3 px-3 text-right sm:text-left font-mono">
                          {item.presupuesto}
                        </td>
                        <td className="py-3 px-3 text-center">{item.porcentaje}</td>
                        <td className="py-3 px-3 text-center">{item.ejecutado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Botón Rojo centrado: Volver al listado */}
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={() => navigate('/generacion-objetivos')}
                className="px-6 py-2 rounded bg-[#d9534f] hover:bg-[#c9302c] text-white font-medium text-xs shadow-xs transition cursor-pointer"
              >
                Volver al listado
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
