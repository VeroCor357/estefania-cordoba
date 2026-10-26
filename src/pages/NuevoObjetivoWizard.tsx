import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Menu,
  Check,
  Calendar,
  ChevronDown,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { objetivosService } from '../services/objetivosService';

export const NuevoObjetivoWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Form State initialized to match screenshot
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: 'Cdo Guar Mil Bs As',
    elementoDependiente: '',
    fechaDesde: '26/10/2026',
    fechaHasta: '',
    descripcion: '',
    conFinanciamiento: false,
    moneda: 'Pesos',
    presupuesto: '',
    fuenteFinanciamiento: 'Fuente 11',
    ordenPrioridad: '1',
    tieneBapin: false,
    estaAprobado: false,
    estaVigente: false,
    // Step 2: Organización
    comandoSuperior: 'ESTADO MAYOR GENERAL DEL EJÉRCITO',
    unidadEjecutora: 'Comando de la Guarnición Militar Buenos Aires',
    oficialResponsable: '',
    clasificacionSeguridad: 'Público',
    observaciones: '',
  });

  const handleNext = () => {
    if (step === 1) {
      if (!formData.nombre.trim()) {
        // Soft fallback without disruptive alerts
        setFormData((prev) => ({ ...prev, nombre: prev.nombre || 'Objetivo Institucional 2026' }));
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await objetivosService.crearObjetivo({
        nombre: formData.nombre || 'Nuevo Objetivo',
        descripcion: formData.descripcion || 'Sin descripción',
        direccion: formData.direccion,
        responsable: formData.oficialResponsable || 'Oficial Responsable',
        tipoObjetivo: formData.conFinanciamiento ? 'Con Financiamiento' : 'Sin Financiamiento',
        esPrioritario: Number(formData.ordenPrioridad) <= 3,
        ordenPrioridad: Number(formData.ordenPrioridad) || 1,
        presupuestoAsignado: parseFloat(formData.presupuesto.replace(/[^\d.-]/g, '')) || 0,
        presupuestoEjecutado: 0,
        porcentajeEjecucion: 0,
        tieneBapin: formData.tieneBapin,
        estaAprobado: formData.estaAprobado,
        estaVigente: formData.estaVigente,
        fuenteFinanciamiento: formData.fuenteFinanciamiento,
      });

      setSavedSuccess(true);
      setTimeout(() => {
        navigate('/generacion-objetivos');
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pb-8">
      {/* 1. Header estilo captura: ← Crear objetivo */}
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          onClick={() => navigate('/generacion-objetivos')}
          className="inline-flex items-center gap-1.5 text-[#1b4353] hover:text-[#0f2833] font-bold text-xs tracking-tight transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Crear objetivo</span>
        </button>
      </div>

      {/* 2. Título Central: Nuevo Objetivo */}
      <div className="text-center my-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
          Nuevo Objetivo
        </h1>
      </div>

      {/* 3. Stepper idéntico a las capturas image_86d7ca3d.png */}
      <div className="max-w-lg mx-auto my-6 px-2">
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

          {/* Paso 2: Organización del objetivo */}
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
                step === 2 ? 'font-bold text-gray-900' : 'font-normal text-gray-400'
              }`}
            >
              Organización del objetivo
            </span>
          </div>

          {/* Paso 3: Revisión */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer shadow-xs ${
                step === 3 ? 'bg-[#1e293b] text-white' : 'bg-[#cbd5e1] text-white'
              }`}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span
              className={`mt-2 text-[11px] transition ${
                step === 3 ? 'font-bold text-gray-900' : 'font-normal text-gray-400'
              }`}
            >
              Revisión
            </span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="max-w-3xl mx-auto mb-4 p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>El objetivo institucional fue registrado exitosamente. Redirigiendo...</span>
        </div>
      )}

      {/* 4. Tarjeta Principal con borde superior oscuro #1e293b */}
      <div className="max-w-3xl mx-auto bg-white rounded-none border-t-4 border-[#1e293b] shadow-xs p-6 sm:p-10 mb-6">
        {/* Título de la tarjeta y nota de campo obligatorio */}
        <div className="relative text-center mb-7">
          <h2 className="text-lg sm:text-xl font-bold text-[#1e293b]">
            {step === 1 && 'Datos del objetivo'}
            {step === 2 && 'Organización del objetivo'}
            {step === 3 && 'Revisión del objetivo'}
          </h2>
          {step === 1 && (
            <span className="sm:absolute sm:right-0 sm:top-1 block sm:inline mt-1 text-xs text-[#c0392b] font-medium">
              *Campo Obligatorio
            </span>
          )}
        </div>

        {/* ===================== PASO 1: DATOS (IDÉNTICO A LAS CAPTURAS) ===================== */}
        {step === 1 && (
          <div className="space-y-6">
            {/* 1. Nombre* */}
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

            {/* 2. Dirección a Cargo */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Dirección a Cargo
              </label>
              <div className="relative">
                <select
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full bg-[#efeff0] text-gray-700 text-xs rounded-none py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                >
                  <option value="Cdo Guar Mil Bs As">Cdo Guar Mil Bs As</option>
                  <option value="Dir Grl Inves Dllo">Dir Grl Inves Dllo</option>
                  <option value="Dir Grl Org Doct">Dir Grl Org Doct</option>
                  <option value="Dir Grl Mat">Dir Grl Mat</option>
                  <option value="Dir Grl Com Info y Ciberdefensa">Dir Grl Com Info y Ciberdefensa</option>
                  <option value="Dir Grl Icia">Dir Grl Icia</option>
                  <option value="Dir Av Ej">Dir Av Ej</option>
                  <option value="Dir Cont Fin">Dir Cont Fin</option>
                  <option value="Dir Grl Sal">Dir Grl Sal</option>
                  <option value="Dir Grl Pers Bien">Dir Grl Pers Bien</option>
                  <option value="Dir Grl Ing e Infr">Dir Grl Ing e Infr</option>
                  <option value="Dir Rem Vet">Dir Rem Vet</option>
                  <option value="Cu Grl-EMGE">Cu Grl-EMGE</option>
                  <option value="DAHE">DAHE</option>
                  <option value="Dir Ars">Dir Ars</option>
                  <option value="Dir Int">Dir Int</option>
                  <option value="Dir Transp">Dir Transp</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Elemento Dependiente */}
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
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent transition-colors"
              />
            </div>

            {/* 4. Fecha desde* */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fecha desde<span className="text-[#c0392b]">*</span>
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-[#2b7cb1] flex items-center">
                <input
                  type="text"
                  value={formData.fechaDesde}
                  onChange={(e) => setFormData({ ...formData, fechaDesde: e.target.value })}
                  placeholder="26/10/2026"
                  className="w-full py-1.5 text-xs text-gray-800 bg-transparent focus:outline-none pr-7"
                />
                <Calendar className="w-4 h-4 text-gray-500 absolute right-1 pointer-events-none" />
              </div>
            </div>

            {/* 5. Fecha hasta * */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fecha hasta <span className="text-[#c0392b]">*</span>
              </label>
              <div className="relative border-b border-gray-300 focus-within:border-[#2b7cb1] flex items-center">
                <input
                  type="text"
                  value={formData.fechaHasta}
                  onChange={(e) => setFormData({ ...formData, fechaHasta: e.target.value })}
                  placeholder="dd/mm/aaaa"
                  className="w-full py-1.5 text-xs text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-400 pr-7"
                />
                <Calendar className="w-4 h-4 text-gray-500 absolute right-1 pointer-events-none" />
              </div>
            </div>

            {/* 6. Descripción* */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Descripción<span className="text-[#c0392b]">*</span>
              </label>
              <textarea
                rows={2}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent resize-none transition-colors"
              />
            </div>

            {/* Divisor horizontal */}
            <div className="border-t border-gray-200 pt-2" />

            {/* 7. Fila: [ ] Con Financiamiento  |  Moneda*  |  Presupuesto* */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              {/* Checkbox Con Financiamiento */}
              <div className="sm:col-span-4 flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  id="conFinanciamiento"
                  checked={formData.conFinanciamiento}
                  onChange={(e) =>
                    setFormData({ ...formData, conFinanciamiento: e.target.checked })
                  }
                  className="w-4 h-4 rounded-xs border-gray-400 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="conFinanciamiento"
                  className="text-xs font-bold text-gray-700 cursor-pointer"
                >
                  Con Financiamiento
                </label>
              </div>

              {/* Moneda* */}
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Moneda<span className="text-[#c0392b]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.moneda}
                    onChange={(e) => setFormData({ ...formData, moneda: e.target.value })}
                    className="w-full bg-[#efeff0] text-gray-700 text-xs rounded-none py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                  >
                    <option value="Pesos">Pesos</option>
                    <option value="Dólares">Dólares</option>
                    <option value="Euros">Euros</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Presupuesto* */}
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Presupuesto<span className="text-[#c0392b]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presupuesto}
                  onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                  placeholder=""
                  className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent transition-colors"
                />
              </div>
            </div>

            {/* 8. Fuente de Financiamiento* */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Fuente de Financiamiento<span className="text-[#c0392b]">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.fuenteFinanciamiento}
                  onChange={(e) =>
                    setFormData({ ...formData, fuenteFinanciamiento: e.target.value })
                  }
                  className="w-full bg-[#efeff0] text-gray-700 text-xs rounded-none py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                >
                  <option value="Fuente 11">Fuente 11</option>
                  <option value="Fuente 12">Fuente 12</option>
                  <option value="Fuente 13">Fuente 13</option>
                  <option value="FONDEF">FONDEF</option>
                  <option value="Tesoro Nacional">Tesoro Nacional</option>
                  <option value="Recursos Propios">Recursos Propios</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 9. Orden de Prioridad */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Orden de Prioridad
              </label>
              <div className="relative">
                <select
                  value={formData.ordenPrioridad}
                  onChange={(e) =>
                    setFormData({ ...formData, ordenPrioridad: e.target.value })
                  }
                  className="w-full bg-[#efeff0] text-gray-700 text-xs rounded-none py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={String(n)}>
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 10. Checkboxes: [ ] Tiene BAPIN   [ ] Está Aprobado   [ ] Está vigente */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tieneBapin"
                  checked={formData.tieneBapin}
                  onChange={(e) => setFormData({ ...formData, tieneBapin: e.target.checked })}
                  className="w-4 h-4 rounded-xs border-gray-400 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="tieneBapin"
                  className="text-xs font-bold text-gray-700 cursor-pointer"
                >
                  Tiene BAPIN
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="estaAprobado"
                  checked={formData.estaAprobado}
                  onChange={(e) =>
                    setFormData({ ...formData, estaAprobado: e.target.checked })
                  }
                  className="w-4 h-4 rounded-xs border-gray-400 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="estaAprobado"
                  className="text-xs font-bold text-gray-700 cursor-pointer"
                >
                  Está Aprobado
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="estaVigente"
                  checked={formData.estaVigente}
                  onChange={(e) =>
                    setFormData({ ...formData, estaVigente: e.target.checked })
                  }
                  className="w-4 h-4 rounded-xs border-gray-400 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="estaVigente"
                  className="text-xs font-bold text-gray-700 cursor-pointer"
                >
                  Está vigente
                </label>
              </div>
            </div>

            {/* 11. Botón Siguiente Azul Centrado */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-2 bg-[#2b7cb1] hover:bg-[#236895] text-white font-bold text-xs rounded transition shadow-2xs cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 2: ORGANIZACIÓN DEL OBJETIVO ===================== */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Comando Superior / Dependencia Principal
              </label>
              <input
                type="text"
                value={formData.comandoSuperior}
                onChange={(e) =>
                  setFormData({ ...formData, comandoSuperior: e.target.value })
                }
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Unidad Ejecutora Responsable
              </label>
              <input
                type="text"
                value={formData.unidadEjecutora}
                onChange={(e) =>
                  setFormData({ ...formData, unidadEjecutora: e.target.value })
                }
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Oficial / Gestor Responsable
              </label>
              <input
                type="text"
                placeholder="Ej.: Coronel Jefe de Departamento"
                value={formData.oficialResponsable}
                onChange={(e) =>
                  setFormData({ ...formData, oficialResponsable: e.target.value })
                }
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Nivel de Clasificación de Seguridad
              </label>
              <div className="relative">
                <select
                  value={formData.clasificacionSeguridad}
                  onChange={(e) =>
                    setFormData({ ...formData, clasificacionSeguridad: e.target.value })
                  }
                  className="w-full bg-[#efeff0] text-gray-700 text-xs rounded-none py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#2b7cb1] cursor-pointer"
                >
                  <option value="Público">Público</option>
                  <option value="Reservado">Reservado</option>
                  <option value="Confidencial">Confidencial</option>
                  <option value="Secreto">Secreto</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Observaciones y Articulación Institucional
              </label>
              <textarea
                rows={3}
                placeholder="Indique convenios, directivas de enlace o dependencias concurrentes..."
                value={formData.observaciones}
                onChange={(e) =>
                  setFormData({ ...formData, observaciones: e.target.value })
                }
                className="w-full border-b border-gray-300 focus:border-[#2b7cb1] focus:outline-none py-1.5 text-xs text-gray-800 bg-transparent resize-none"
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded transition cursor-pointer"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-2 bg-[#2b7cb1] hover:bg-[#236895] text-white font-bold text-xs rounded transition shadow-2xs cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: REVISIÓN ===================== */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-[#f8fafc] border border-gray-200 rounded p-4 text-xs space-y-3">
              <div className="border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Nombre:</span>
                <p className="font-bold text-gray-900 text-sm mt-0.5">
                  {formData.nombre || 'Objetivo Institucional sin denominación'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500 font-medium">Dirección a Cargo:</span>
                  <p className="font-semibold text-gray-800">{formData.direccion}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Elemento Dependiente:</span>
                  <p className="font-semibold text-gray-800">
                    {formData.elementoDependiente || '-'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Fecha Desde:</span>
                  <p className="font-semibold text-gray-800">{formData.fechaDesde}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Fecha Hasta:</span>
                  <p className="font-semibold text-gray-800">{formData.fechaHasta || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Fuente Financiamiento:</span>
                  <p className="font-semibold text-gray-800">{formData.fuenteFinanciamiento}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Orden de Prioridad:</span>
                  <p className="font-semibold text-gray-800">{formData.ordenPrioridad}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Financiamiento:</span>
                  <p className="font-semibold text-gray-800">
                    {formData.conFinanciamiento
                      ? `Con Financiamiento (${formData.moneda} ${formData.presupuesto || '0'})`
                      : 'Sin Financiamiento'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Estado y BAPIN:</span>
                  <p className="font-semibold text-gray-800">
                    {[
                      formData.tieneBapin && 'Tiene BAPIN',
                      formData.estaAprobado && 'Aprobado',
                      formData.estaVigente && 'Vigente',
                    ]
                      .filter(Boolean)
                      .join(' • ') || 'Sin acreditaciones especiales'}
                  </p>
                </div>
              </div>

              {formData.descripcion && (
                <div className="border-t border-gray-200 pt-2">
                  <span className="text-gray-500 font-medium">Descripción:</span>
                  <p className="text-gray-700 mt-0.5">{formData.descripcion}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded transition cursor-pointer"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-2 bg-[#2b7cb1] hover:bg-[#236895] text-white font-bold text-xs rounded transition shadow-2xs cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Registrando...' : 'Confirmar y Guardar'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
