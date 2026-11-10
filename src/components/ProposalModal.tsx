import React, { useState } from 'react';
import { Challenge } from '../types';
import { X, GitBranch, CheckCircle2, AlertCircle, Link2, Send, HelpCircle } from 'lucide-react';

interface ProposalModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    challengeId: string;
    developerName: string;
    developerEmail: string;
    githubUrl: string;
    technicalDescription: string;
    demoUrl?: string;
  }) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [developerName, setDeveloperName] = useState('');
  const [developerEmail, setDeveloperEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [technicalDescription, setTechnicalDescription] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (!isOpen || !challenge) return null;

  // Validate GitHub URL
  const isValidGithubUrl = (url: string): boolean => {
    const trimmed = url.trim();
    // Accept https://github.com/owner/repo or http or with optional trailing slash
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/i;
    return githubRegex.test(trimmed);
  };

  const isGithubValid = isValidGithubUrl(githubUrl);
  const isNameValid = developerName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(developerEmail.trim());
  const isDescValid = technicalDescription.trim().length >= 25;

  const isFormValid = isGithubValid && isNameValid && isEmailValid && isDescValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      github: true,
      desc: true,
    });

    if (!isFormValid) return;

    // Normalize github URL if missing protocol
    let finalGithub = githubUrl.trim();
    if (!finalGithub.startsWith('http://') && !finalGithub.startsWith('https://')) {
      finalGithub = `https://${finalGithub}`;
    }

    onSubmit({
      challengeId: challenge.id,
      developerName: developerName.trim(),
      developerEmail: developerEmail.trim(),
      githubUrl: finalGithub,
      technicalDescription: technicalDescription.trim(),
      demoUrl: demoUrl.trim() || undefined,
    });

    // Reset fields
    setDeveloperName('');
    setDeveloperEmail('');
    setGithubUrl('');
    setDemoUrl('');
    setTechnicalDescription('');
    setTouched({});
    onClose();
  };

  const fillExampleData = () => {
    setDeveloperName('Ing. Rodrigo Peña & Equipo');
    setDeveloperEmail('rodrigo.pena@devflow.org');
    setGithubUrl('https://github.com/rodrigopena/solucion-optimizacion-v1');
    setTechnicalDescription(
      'Implementación de algoritmo heurístico con paralelización multihilo. Incluye suite completa de pruebas unitarias, Dockerfile para reproducibilidad y benchmarks que demuestran un 28% de mejora de rendimiento frente a la solución de referencia.'
    );
    setDemoUrl('https://preview-rodrigo.dev');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium mb-1">
              <GitBranch className="w-4 h-4" />
              <span>Presentación de Solución GitHub</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {challenge.title}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Empresa solicitante:{' '}
              <span className="text-gray-200 font-semibold">{challenge.company}</span> · Recompensa:{' '}
              <span className="text-emerald-400 font-mono font-bold">
                ${challenge.reward.toLocaleString('en-US')} USD
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Quick autofill helper for easy review */}
          <div className="flex items-center justify-between text-xs bg-gray-900/60 border border-gray-800 p-2.5 rounded-lg">
            <span className="text-gray-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              ¿Quieres probar el flujo rápidamente?
            </span>
            <button
              type="button"
              onClick={fillExampleData}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2"
            >
              Cargar datos de ejemplo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Developer / Team Name */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Nombre del Desarrollador o Equipo <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={developerName}
                onChange={(e) => setDeveloperName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                placeholder="Ej. Mateo Gómez / TechLab Lima"
                className={`w-full px-3.5 py-2.5 bg-[#0B0F17] border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  touched.name && !isNameValid
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-gray-800 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {touched.name && !isNameValid && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Ingrese un nombre válido (mínimo 3 caracteres)
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Correo Electrónico de Contacto <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={developerEmail}
                onChange={(e) => setDeveloperEmail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                placeholder="desarrollador@ejemplo.com"
                className={`w-full px-3.5 py-2.5 bg-[#0B0F17] border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  touched.email && !isEmailValid
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-gray-800 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {touched.email && !isEmailValid && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Ingrese un correo electrónico válido
                </p>
              )}
            </div>
          </div>

          {/* GitHub URL Field (Mandatory Validation) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-gray-300">
                URL del Repositorio de GitHub <span className="text-rose-400">*</span>
              </label>
              {githubUrl && isGithubValid && (
                <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enlace de GitHub válido
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Link2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, github: true }))}
                placeholder="https://github.com/usuario/nombre-del-repositorio"
                className={`w-full pl-9 pr-10 py-2.5 bg-[#0B0F17] border font-mono text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 rounded-lg ${
                  touched.github && !isGithubValid
                    ? 'border-rose-500 focus:ring-rose-500'
                    : githubUrl && isGithubValid
                    ? 'border-emerald-500/50 focus:ring-emerald-500'
                    : 'border-gray-800 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {githubUrl && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {isGithubValid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  )}
                </div>
              )}
            </div>
            {touched.github && !isGithubValid ? (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Debe ser una URL válida de GitHub (ej.{' '}
                <span className="font-mono">https://github.com/usuario/repositorio</span>)
              </p>
            ) : (
              <p className="text-[11px] text-gray-500 mt-1">
                Asegúrate de que el repositorio sea público para que los evaluadores de la empresa puedan auditar el código.
              </p>
            )}
          </div>

          {/* Live Demo URL (Optional) */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              URL de Demostración o Despliegue en Vivo <span className="text-gray-500">(Opcional)</span>
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://tu-demo-en-vivo.com"
              className="w-full px-3.5 py-2 bg-[#0B0F17] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Technical Description */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Descripción Técnica y Arquitectura de la Solución <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={technicalDescription}
              onChange={(e) => setTechnicalDescription(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, desc: true }))}
              placeholder="Explica tu enfoque técnico: stack utilizado, algoritmos implementados, métricas de desempeño alcanzadas e instrucciones para ejecutar las pruebas en tu repositorio..."
              className={`w-full px-3.5 py-2.5 bg-[#0B0F17] border rounded-lg text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 leading-relaxed ${
                touched.desc && !isDescValid
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-gray-800 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            <div className="flex items-center justify-between text-[11px] mt-1">
              {touched.desc && !isDescValid ? (
                <span className="text-rose-400">Describe tu solución con al menos 25 caracteres</span>
              ) : (
                <span className="text-gray-500">Mínimo 25 caracteres para evaluación formal</span>
              )}
              <span className="text-gray-500 font-mono">{technicalDescription.length} chars</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/40'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Enviar Propuesta a la Empresa</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
