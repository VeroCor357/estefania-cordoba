import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProyectoFila } from '../../pages/InformacionProyectos';

interface ModalCrearProyectoProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (proyecto: Omit<ProyectoFila, 'id'>) => void;
}

const OFICIALES_OPCIONES = [
  '-- No está en la lista (Cargar manual) --',
  'CR VILLALBA',
  'MY MORALES',
  'CT TERAN',
  'MY BALESTRINI',
  'TC FERRERO',
  'MY DIAZ',
  'CI MENDOZA',
  'SG BAPTISTA',
];

export const ModalCrearProyecto: React.FC<ModalCrearProyectoProps> = ({
  isOpen,
  onClose,
  onGuardar,
}) => {
  const [nombre, setNombre] = useState('');
  const [tipoProyecto, setTipoProyecto] = useState<ProyectoFila['tipoProyecto']>('Finalizado');

  // Jefe de Proyecto
  const [jefeSelect, setJefeSelect] = useState('-- No está en la lista (Cargar manual) --');
  const [jefeManual, setJefeManual] = useState('');

  // Asesor Técnico
  const [asesorTecnicoSelect, setAsesorTecnicoSelect] = useState('-- No está en la lista (Cargar manual) --');
  const [asesorTecnicoManual, setAsesorTecnicoManual] = useState('');

  // Asesor Operativo
  const [asesorOperativoSelect, setAsesorOperativoSelect] = useState('-- No está en la lista (Cargar manual) --');
  const [asesorOperativoManual, setAsesorOperativoManual] = useState('');

  // Textareas
  const [descripcion, setDescripcion] = useState('');
  const [distribucionEfectos, setDistribucionEfectos] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Nivel de Madures
  const [nivelMadures, setNivelMadures] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('Por favor ingrese el nombre del proyecto.');
      return;
    }

    const jefeFinal =
      jefeSelect === '-- No está en la lista (Cargar manual) --'
        ? jefeManual.trim() || 'Sin asignar'
        : jefeSelect;

    const tecnicoFinal =
      asesorTecnicoSelect === '-- No está en la lista (Cargar manual) --'
        ? asesorTecnicoManual.trim() || ''
        : asesorTecnicoSelect;

    const operativoFinal =
      asesorOperativoSelect === '-- No está en la lista (Cargar manual) --'
        ? asesorOperativoManual.trim() || ''
        : asesorOperativoSelect;

    const parsedNivel = nivelMadures.trim() ? Number(nivelMadures.trim()) : null;

    onGuardar({
      nombre: nombre.trim(),
      tipoProyecto,
      jefeProyecto: jefeFinal,
      asesorTecnico: tecnicoFinal,
      asesorOperativo: operativoFinal,
      descripcion: descripcion.trim(),
      distribucionEfectos: distribucionEfectos.trim(),
      observaciones: observaciones.trim(),
      nivelMadurez: Number.isNaN(parsedNivel) ? null : parsedNivel,
      porcentaje: 0,
    });

    // Reset fields
    setNombre('');
    setTipoProyecto('Finalizado');
    setJefeSelect('-- No está en la lista (Cargar manual) --');
    setJefeManual('');
    setAsesorTecnicoSelect('-- No está en la lista (Cargar manual) --');
    setAsesorTecnicoManual('');
    setAsesorOperativoSelect('-- No está en la lista (Cargar manual) --');
    setAsesorOperativoManual('');
    setDescripcion('');
    setDistribucionEfectos('');
    setObservaciones('');
    setNivelMadures('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="relative bg-white rounded-md shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header exacto a la captura: "Crear Proyecto" y botón de cerrar "✕" */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#2d3748]">Crear Proyecto</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-light leading-none p-1 transition cursor-pointer"
            aria-label="Cerrar"
          >
            &#10005;
          </button>
        </div>

        {/* Formulario scrolleable con todos los campos exactamente ordenados */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
              required
            />
          </div>

          {/* Tipo De Proyecto */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Tipo De Proyecto
            </label>
            <div className="relative">
              <select
                value={tipoProyecto}
                onChange={(e) => setTipoProyecto(e.target.value as ProyectoFila['tipoProyecto'])}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-[#f4f5f7] appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7]"
              >
                <option value="Finalizado">Finalizado</option>
                <option value="Archivados">Archivados</option>
                <option value="Con Financiamiento">Con Financiamiento</option>
                <option value="En Estudio">En Estudio</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Jefe De Proyecto */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Jefe De Proyecto
            </label>
            <div className="relative">
              <select
                value={jefeSelect}
                onChange={(e) => setJefeSelect(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-[#f4f5f7] appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7]"
              >
                {OFICIALES_OPCIONES.map((opc) => (
                  <option key={opc} value={opc}>
                    {opc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <input
              type="text"
              placeholder="Ingrese el nombre manual aquí..."
              value={jefeManual}
              onChange={(e) => setJefeManual(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Asesor Técnico */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Asesor Técnico
            </label>
            <div className="relative">
              <select
                value={asesorTecnicoSelect}
                onChange={(e) => setAsesorTecnicoSelect(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-[#f4f5f7] appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7]"
              >
                {OFICIALES_OPCIONES.map((opc) => (
                  <option key={opc} value={opc}>
                    {opc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <input
              type="text"
              placeholder="Ingrese el nombre manual aquí..."
              value={asesorTecnicoManual}
              onChange={(e) => setAsesorTecnicoManual(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Asesor Operativo */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Asesor Operativo
            </label>
            <div className="relative">
              <select
                value={asesorOperativoSelect}
                onChange={(e) => setAsesorOperativoSelect(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-[#f4f5f7] appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7]"
              >
                {OFICIALES_OPCIONES.map((opc) => (
                  <option key={opc} value={opc}>
                    {opc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <input
              type="text"
              placeholder="Ingrese el nombre manual aquí..."
              value={asesorOperativoManual}
              onChange={(e) => setAsesorOperativoManual(e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 resize-y min-h-[64px] focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Distribución De Efectos */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Distribución De Efectos
            </label>
            <textarea
              rows={3}
              value={distribucionEfectos}
              onChange={(e) => setDistribucionEfectos(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 resize-y min-h-[64px] focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Observaciones
            </label>
            <textarea
              rows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 resize-y min-h-[64px] focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Nivel De Madures (exact verbatim spelling from screenshots) */}
          <div>
            <label className="block text-xs sm:text-[13px] font-bold text-[#2d3748] mb-1">
              Nivel De Madures
            </label>
            <input
              type="text"
              value={nivelMadures}
              onChange={(e) => setNivelMadures(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#337ab7] focus:border-[#337ab7] transition"
            />
          </div>

          {/* Footer exacto a las capturas: Botón Cerrar (rojo) y Botón Aceptar (azul) alineados a la derecha */}
          <div className="pt-3 pb-1 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#d9534f] hover:bg-[#c9302c] text-white text-xs sm:text-sm font-semibold rounded shadow-2xs transition cursor-pointer"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#337ab7] hover:bg-[#286090] text-white text-xs sm:text-sm font-semibold rounded shadow-2xs transition cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
