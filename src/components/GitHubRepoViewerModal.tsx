import React, { useState } from 'react';
import { Solution, Challenge } from '../types';
import {
  X,
  GitBranch,
  GitCommit,
  Star,
  Eye,
  GitFork,
  FileCode,
  FileText,
  Copy,
  Check,
  Play,
  Terminal,
  ExternalLink,
  Shield,
  Download,
  BookOpen,
} from 'lucide-react';

interface GitHubRepoViewerModalProps {
  solution: Solution | null;
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubRepoViewerModal: React.FC<GitHubRepoViewerModalProps> = ({
  solution,
  challenge,
  isOpen,
  onClose,
}) => {
  const [activeFile, setActiveFile] = useState<'code' | 'readme'>('code');
  const [copied, setCopied] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(7);

  if (!isOpen || !solution) return null;

  const codeLines = solution.code.split('\n');
  const codeBytes = new Blob([solution.code]).size;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(solution.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setShowTerminal(true);
    setIsRunning(true);
    setTerminalOutput(`$ ${solution.language === 'python' ? 'python3' : 'node'} ${solution.fileName}\nCompilando y ejecutando en sandbox...\n`);

    setTimeout(() => {
      setIsRunning(false);
      const output =
        solution.executionOutput ||
        `Ejecución finalizada con código de salida 0.\nSalida estándar:\n${solution.code
          .split('\n')
          .filter((line) => line.includes('console.log') || line.includes('print'))
          .map((line) => '>>> ' + line.replace(/(console\.log|print)\(|\);?/g, ''))
          .join('\n') || 'Proceso completado sin errores.'}`;
      setTerminalOutput(
        (prev) => prev + `[OK] Proceso terminado (tiempo: 34ms)\n----------------------------------------\n${output}`
      );
    }, 600);
  };

  const handleToggleStar = () => {
    if (starred) {
      setStarCount((c) => c - 1);
      setStarred(false);
    } else {
      setStarCount((c) => c + 1);
      setStarred(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#0D1117] border border-[#30363D] rounded-xl shadow-2xl text-gray-200 overflow-hidden my-4"
        role="dialog"
        aria-modal="true"
      >
        {/* GitHub Top Header */}
        <div className="bg-[#161B22] border-b border-[#30363D] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb Repo Name */}
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {solution.username.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-gray-400 font-normal hover:underline cursor-pointer">
              {solution.username}
            </span>
            <span className="text-gray-500 font-light">/</span>
            <span className="text-purple-400 font-bold truncate hover:underline cursor-pointer">
              {solution.repoName.split('/')[1] || solution.repoName}
            </span>
            <span className="text-[11px] font-medium text-gray-400 border border-[#30363D] px-2 py-0.5 rounded-full ml-1 shrink-0">
              Public
            </span>
          </div>

          {/* Right Action Badges & Close */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Star Button */}
            <button
              onClick={handleToggleStar}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                starred
                  ? 'bg-purple-950/80 border-purple-500 text-purple-300'
                  : 'bg-[#21262D] border-[#30363D] text-gray-300 hover:bg-[#30363D]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${starred ? 'fill-purple-400 text-purple-400' : 'text-gray-400'}`} />
              <span>{starred ? 'Starred' : 'Star'}</span>
              <span className="bg-[#161B22] px-1.5 py-0.2 rounded text-[11px] font-mono text-gray-400">
                {starCount}
              </span>
            </button>

            {/* Fork Button */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#21262D] border border-[#30363D] text-gray-300">
              <GitFork className="w-3.5 h-3.5 text-gray-400" />
              <span>Fork</span>
              <span className="bg-[#161B22] px-1.5 py-0.2 rounded text-[11px] font-mono text-gray-400">
                0
              </span>
            </div>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-[#30363D] transition-colors ml-1"
              aria-label="Cerrar visor de repositorio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Challenge Context Ribbon */}
        {challenge && (
          <div className="bg-[#090D16] border-b border-[#30363D] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2 text-gray-400 truncate">
              <span className="text-gray-500">Reto Empresarial:</span>
              <span className="text-gray-200 font-semibold truncate">{challenge.title}</span>
              <span className="text-gray-600">·</span>
              <span className="text-purple-400">{challenge.company}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-gray-400">Recompensa:</span>
              <span className="text-emerald-400 font-mono font-bold">
                ${challenge.reward.toLocaleString('en-US')} USD
              </span>
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                  solution.status === 'aceptada'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : solution.status === 'rechazada'
                    ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                }`}
              >
                {solution.status === 'aceptada'
                  ? 'Aceptada / Ganadora'
                  : solution.status === 'rechazada'
                  ? 'Rechazada'
                  : 'En revisión'}
              </span>
            </div>
          </div>
        )}

        {/* Repository Subheader: Branch & Latest Commit */}
        <div className="px-4 sm:px-6 py-3 bg-[#0D1117] flex flex-wrap items-center justify-between gap-3 border-b border-[#30363D]">
          {/* Branch Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-[#21262D] border border-[#30363D] rounded-md text-gray-200">
              <GitBranch className="w-3.5 h-3.5 text-gray-400" />
              <span>main</span>
            </div>
            <span className="text-xs text-gray-400 hidden sm:inline">
              <strong>1</strong> rama · <strong>1</strong> commit
            </span>
          </div>

          {/* Quick Clone / Runner buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-md transition-colors shadow-sm shadow-purple-900/30"
              title="Ejecutar este script en consola interactiva"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Ejecutar Script</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Commit Metadata Bar */}
        <div className="mx-4 sm:mx-6 my-3 p-3 bg-[#161B22] border border-[#30363D] rounded-lg flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
          <div className="flex items-center gap-2 truncate">
            <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {solution.username[0]}
            </div>
            <span className="font-semibold text-gray-200">{solution.username}</span>
            <span className="text-gray-300 truncate">{solution.commitMessage}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 shrink-0 font-mono text-[11px]">
            <span className="text-purple-400 font-semibold">{solution.commitHash}</span>
            <span className="text-gray-600">·</span>
            <span>{solution.submittedAt}</span>
          </div>
        </div>

        {/* File Tabs: [main code file] and [README.md] */}
        <div className="px-4 sm:px-6 flex items-center gap-2 border-b border-[#30363D] text-xs">
          <button
            onClick={() => setActiveFile('code')}
            className={`flex items-center gap-2 px-3 py-2 border-b-2 font-medium transition-colors ${
              activeFile === 'code'
                ? 'border-purple-500 text-white font-semibold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
            <span>{solution.fileName}</span>
          </button>

          <button
            onClick={() => setActiveFile('readme')}
            className={`flex items-center gap-2 px-3 py-2 border-b-2 font-medium transition-colors ${
              activeFile === 'readme'
                ? 'border-purple-500 text-white font-semibold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>README.md</span>
          </button>
        </div>

        {/* File Content Area */}
        <div className="p-4 sm:p-6">
          {activeFile === 'code' ? (
            /* Code File View */
            <div className="border border-[#30363D] rounded-lg overflow-hidden bg-[#0D1117]">
              {/* Code Box Bar */}
              <div className="bg-[#161B22] border-b border-[#30363D] px-4 py-2 flex items-center justify-between text-xs text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-200 font-medium">{solution.fileName}</span>
                  <span className="text-gray-600">·</span>
                  <span>{codeLines.length} líneas</span>
                  <span className="text-gray-600">·</span>
                  <span>{(codeBytes / 1024).toFixed(2)} KB</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500 uppercase">{solution.language}</span>
                  <button
                    onClick={handleCopyCode}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Raw</span>
                  </button>
                </div>
              </div>

              {/* Code Viewer with Line Numbers */}
              <div className="overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed bg-[#0D1117]">
                <table className="w-full border-collapse">
                  <tbody>
                    {codeLines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-[#161B22]/60 group">
                        <td className="text-right pr-4 text-gray-600 select-none w-10 align-top text-[11px] group-hover:text-gray-400 font-mono">
                          {idx + 1}
                        </td>
                        <td className="text-gray-200 whitespace-pre font-mono">
                          {renderSyntaxHighlight(line)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* README.md View */
            <div className="border border-[#30363D] rounded-lg p-6 bg-[#0D1117] text-gray-300 space-y-4">
              <div className="border-b border-[#30363D] pb-3 flex items-center gap-2 text-sm font-bold text-white">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>README.md</span>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-3">
                <h1 className="text-xl font-bold text-white border-b border-[#30363D] pb-2">
                  {solution.repoName}
                </h1>
                <p className="text-gray-300 leading-relaxed">
                  {solution.description}
                </p>

                <h2 className="text-base font-semibold text-white pt-2">
                  Desafío Asociado
                </h2>
                <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg text-xs">
                  <p>
                    <strong>Empresa:</strong> {challenge?.company} ({challenge?.industry})
                  </p>
                  <p className="mt-1">
                    <strong>Problema:</strong> {challenge?.summary}
                  </p>
                  <p className="mt-1">
                    <strong>Recompensa:</strong> ${challenge?.reward.toLocaleString('en-US')} USD
                  </p>
                </div>

                <h2 className="text-base font-semibold text-white pt-2">
                  Instrucciones de Ejecución
                </h2>
                <div className="bg-[#161B22] p-3 rounded-lg font-mono text-xs text-purple-300">
                  <code>
                    git clone https://github.com/{solution.repoName}.git
                    <br />
                    cd {solution.repoName.split('/')[1] || 'solution'}
                    <br />
                    {solution.language === 'python' ? 'python3 ' : 'node '}
                    {solution.fileName}
                  </code>
                </div>

                <p className="text-gray-400 text-xs">
                  Desarrollado y subido por <strong>{solution.username}</strong> a la plataforma NexusSolve.
                </p>
              </div>
            </div>
          )}

          {/* Simulated Interactive Terminal */}
          {showTerminal && (
            <div className="mt-4 border border-[#30363D] rounded-lg bg-[#090D16] overflow-hidden">
              <div className="bg-[#161B22] px-4 py-2 border-b border-[#30363D] flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-mono font-semibold">Terminal de Ejecución Sandbox</span>
                  {isRunning && (
                    <span className="text-[10px] text-amber-400 animate-pulse font-mono">
                      [Ejecutando...]
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-500 hover:text-gray-300 text-xs"
                >
                  Ocultar
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-48">
                {terminalOutput}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#161B22] border-t border-[#30363D] px-6 py-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">NexusSolve Code Hub</span>
            <span className="text-gray-600">·</span>
            <span>Repositorio persistido en localStorage</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-[#21262D] hover:bg-[#30363D] text-gray-200 border border-[#30363D] rounded-md transition-colors"
          >
            Cerrar Repositorio
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple syntax colorizer for the GitHub dark aesthetic
function renderSyntaxHighlight(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return <span className="text-gray-500 italic">{line}</span>;
  }
  if (line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-gray-500 italic">{line}</span>;
  }
  
  // Highlight keywords
  const parts = line.split(/(\b(?:def|class|function|return|import|from|const|let|var|if|else|while|for|new|try|catch|async|await)\b|"[^"]*"|'[^']*'|`[^`]*`)/g);

  return parts.map((part, i) => {
    if (/^(def|class|function|return|import|from|const|let|var|if|else|while|for|new|try|catch|async|await)$/.test(part)) {
      return <span key={i} className="text-[#FF7B72] font-semibold">{part}</span>; // Red/Purple keyword
    }
    if (part.startsWith('"') || part.startsWith("'") || part.startsWith('`')) {
      return <span key={i} className="text-[#A5D6FF]">{part}</span>; // String
    }
    if (/^(print|console\.log|Math|Date|JSON|crypto|heapq|random)$/.test(part)) {
      return <span key={i} className="text-[#79C0FF]">{part}</span>; // Built-in
    }
    return <span key={i}>{part}</span>;
  });
}
