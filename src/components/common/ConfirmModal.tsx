import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string | React.ReactNode;
  detail?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Confirmar eliminación?',
  message = '¿Está seguro de que desea eliminar este registro?',
  detail = 'Esta acción no se puede deshacer.',
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
  variant = 'danger',
}) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <Trash2 className="w-4 h-4 stroke-[2]" />
            </div>
            <h3 className="text-sm sm:text-base text-gray-800 font-semibold">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 text-xl leading-none font-semibold cursor-pointer"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 bg-white">
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {message}
          </div>
          {detail && (
            <p className="text-xs text-gray-400 mt-2">
              {detail}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-gray-200 flex justify-end gap-2.5 bg-gray-50/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded shadow-2xs transition cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-[#d9534f] hover:bg-[#c9302c] rounded shadow-2xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
