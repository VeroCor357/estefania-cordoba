import React from 'react';
import { BookOpen, Shield, Target, DollarSign, Database, CheckCircle, Code } from 'lucide-react';

export const Instructivo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0c3b1e] text-emerald-300 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              Manual Operativo e Instructivo Técnico del SCGEA
            </h1>
            <p className="text-xs text-gray-500">
              Sistema de Control y Gestión del Ejército Argentino - Centro de Producción de Software (CPS)
            </p>
          </div>
        </div>
      </div>

      {/* Manual Content */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#0c3b1e] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-200">
            <Shield className="w-4 h-4" /> 1. Propósito Institucional del SCGEA
          </h2>
          <p>
            El <strong>Sistema de Control y Gestión del Ejército Argentino (SCGEA)</strong> es la
            herramienta institucional unificada para la formulación, seguimiento presupuestario,
            certificación de avances y auditoría de los objetivos operacionales y proyectos
            tecnológicos de la Fuerza.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#0c3b1e] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-200">
            <Target className="w-4 h-4" /> 2. Ciclo de Vida de los Objetivos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <span className="font-bold text-gray-900 block mb-1">Con Financiamiento</span>
              <p className="text-[11px] text-gray-600">
                Objetivos con crédito asignado vía FONDEF (Fondo Nacional de la Defensa) o Tesoro
                Nacional. Requieren validación del código BAPIN ministerial.
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <span className="font-bold text-gray-900 block mb-1">Sin Financiamiento (I+D)</span>
              <p className="text-[11px] text-gray-600">
                Iniciativas en etapa de estudio o investigación de prefactibilidad por parte de la
                DGIyD en espera de apertura de partida presupuestaria.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#0c3b1e] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-200">
            <DollarSign className="w-4 h-4" /> 3. Protocolo de Formato Monetario y Fechas
          </h2>
          <p>
            De conformidad con la normativa del Estado Mayor General:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>Moneda:</strong> Se utiliza el Peso Argentino con separador de miles por punto
              y decimales con coma (ej: <code>$ 1.091.142.708,00</code>).
            </li>
            <li>
              <strong>Fechas:</strong> Formato institucional calendario <code>DD/MM/AAAA</code>.
            </li>
            <li>
              <strong>Nivel de Madurez Tecnológica:</strong> Escala estandarizada militar TRL (1 a 9).
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#0c3b1e] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-200">
            <Code className="w-4 h-4" /> 4. Arquitectura de Integración Frontend - C# ASP.NET Core
          </h2>
          <p>
            El frontend desacoplado se comunica con la API de ASP.NET Core mediante contratos
            REST tipados en TypeScript (<code>src/types/objetivos.ts</code>, <code>src/types/proyectos.ts</code>).
            Las llamadas incluyen automáticamente en los headers HTTP el token JWT institucional:
          </p>
          <div className="bg-gray-900 text-emerald-400 p-3 rounded font-mono text-[11px] overflow-x-auto">
            Authorization: Bearer [JWT_TOKEN_INSTITUCIONAL]
          </div>
          <p className="text-gray-500 text-[11px] mt-1">
            En caso de operar fuera de la red cerrada militar o durante pruebas locales de interfaz,
            los servicios activan la contingencia con el catálogo simulado de alta fidelidad.
          </p>
        </section>

        <div className="p-4 bg-emerald-50 rounded border border-emerald-200 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <span className="font-semibold text-emerald-950 text-xs">
            Desarrollado y mantenido por el Centro de Producción de Software (CPS) - Ejército Argentino.
          </span>
        </div>
      </div>
    </div>
  );
};
