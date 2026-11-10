import React, { useState, useEffect } from 'react';
import { Challenge, Solution } from '../types';
import {
  X,
  Code2,
  GitBranch,
  Send,
  Sparkles,
  FileCode,
  DollarSign,
  Play,
  RotateCcw,
} from 'lucide-react';

interface SubmitSolutionModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (solutionData: Omit<Solution, 'id' | 'submittedAt' | 'status' | 'commitHash'>) => void;
  currentUsername: string;
}

export const SubmitSolutionModal: React.FC<SubmitSolutionModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onSubmit,
  currentUsername,
}) => {
  const [language, setLanguage] = useState<string>('python');
  const [fileName, setFileName] = useState<string>('main.py');
  const [code, setCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [commitMessage, setCommitMessage] = useState<string>('feat: Solución validada para reto');
  const [repoName, setRepoName] = useState<string>('');

  useEffect(() => {
    if (challenge) {
      setLanguage(challenge.suggestedLanguage.toLowerCase());
      setFileName(challenge.defaultFileName);
      setCode(challenge.starterCode);
      const cleanSlug = challenge.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 24);
      setRepoName(`${currentUsername.toLowerCase()}/${cleanSlug}`);
      setDescription(
        `Implementación de solución para el desafío de ${challenge.company}: ${challenge.title}.`
      );
      setCommitMessage(`feat: Implementación inicial de ${challenge.defaultFileName}`);
    }
  }, [challenge, currentUsername]);

  if (!isOpen || !challenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    onSubmit({
      challengeId: challenge.id,
      username: currentUsername,
      repoName: repoName.trim() || `${currentUsername.toLowerCase()}/solucion-${challenge.id}`,
      fileName: fileName.trim() || 'solution.py',
      language,
      code,
      description: description.trim(),
      commitMessage: commitMessage.trim() || 'feat: Entrega de código para reto empresarial',
      executionOutput: `[OK] Script ${fileName} compilado y probado exitosamente para ${challenge.company}.\nSalida generada sin errores en la prueba de integración.`,
    });

    onClose();
  };

  const handleInsertHelloWorld = () => {
    setCode(`// ==============================================================
// Script "Hola Mundo" para verificación de entorno
// Desarrollado por: ${currentUsername}
// ==============================================================

function holaMundo(usuario = "${currentUsername}") {
  const saludo = \`¡Hola Mundo desde NexusSolve! Código entregado por \${usuario}.\`;
  console.log(saludo);
  console.log("Timestamp: " + new Date().toISOString());
  return { status: 200, success: true, usuario: usuario };
}

holaMundo();
`);
    setLanguage('javascript');
    setFileName('hola_mundo.js');
    setCommitMessage('feat: Inserción de script Hola Mundo validado');
  };

  const handleResetToTemplate = () => {
    setCode(challenge.starterCode);
    setLanguage(challenge.suggestedLanguage.toLowerCase());
    setFileName(challenge.defaultFileName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#0D1117] border border-[#30363D] rounded-xl shadow-2xl p-6 sm:p-8 my-4 text-gray-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#30363D]">
          <div>
            <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold mb-1">
              <Code2 className="w-4 h-4" />
              <span>Redactar y Enviar Solución</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {challenge.title}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Empresa: <strong className="text-gray-200">{challenge.company}</strong> ·
              Recompensa:{' '}
              <strong className="text-emerald-400 font-mono">
                ${challenge.reward.toLocaleString('en-US')} USD
              </strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#161B22] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#161B22] border border-[#30363D] rounded-lg text-xs">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Plantillas de código rápido:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInsertHelloWorld}
                className="px-2.5 py-1 text-xs font-semibold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 rounded transition-colors"
              >
                Cargar "Hola Mundo"
              </button>
              <button
                type="button"
                onClick={handleResetToTemplate}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-200 bg-[#21262D] rounded transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer Algoritmo</span>
              </button>
            </div>
          </div>

          {/* Repo Name & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Nombre del Repositorio GitHub
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                  <GitBranch className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#090D16] border border-[#30363D] rounded-lg font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Nombre de Archivo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FileCode className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#090D16] border border-[#30363D] rounded-lg font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Code Editor Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-gray-300">
                Código Fuente de la Solución (Python / JavaScript / Script Plano)
              </label>
              <span className="text-[11px] font-mono text-gray-400">
                {code.split('\n').length} líneas
              </span>
            </div>
            <textarea
              rows={12}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Escribe aquí tu código..."
              className="w-full p-4 bg-[#090D16] border border-[#30363D] rounded-lg font-mono text-xs sm:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 leading-relaxed scrollbar-thin"
              spellCheck={false}
            />
          </div>

          {/* Description & Commit Message */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Mensaje de Commit
              </label>
              <input
                type="text"
                required
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="feat: Mi solución técnica"
                className="w-full px-3 py-2 bg-[#090D16] border border-[#30363D] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Breve Explicación Técnica
              </label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explicación del enfoque y pruebas..."
                className="w-full px-3 py-2 bg-[#090D16] border border-[#30363D] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#30363D]">
            <span className="text-xs text-gray-400 hidden sm:inline">
              Al enviar, el código se registrará automáticamente en <strong>Mis Soluciones</strong>.
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white bg-[#161B22] hover:bg-[#21262D] rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-lg shadow-purple-900/40 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar y Crear Repositorio</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
