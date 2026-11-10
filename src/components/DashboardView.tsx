import React from 'react';
import { User, Challenge, Solution, NavigationTab } from '../types';
import {
  Code2,
  DollarSign,
  FolderGit2,
  Rocket,
  Award,
  ArrowRight,
  TrendingUp,
  Sparkles,
  GitBranch,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: User;
  challenges: Challenge[];
  solutions: Solution[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenSolutionRepo: (solution: Solution) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  challenges,
  solutions,
  onNavigate,
  onOpenSolutionRepo,
}) => {
  const totalBounty = challenges.reduce((sum, c) => sum + c.reward, 0);
  const acceptedSolutions = solutions.filter((s) => s.status === 'aceptada');
  const earnedBounty = acceptedSolutions.reduce((sum, s) => {
    const ch = challenges.find((c) => c.id === s.challengeId);
    return sum + (ch ? ch.reward : 0);
  }, 0);

  // Quick challenge spotlight (e.g. CodeAcademy Labs or Callao)
  const starterChallenge = challenges.find((c) => c.id === 'chl-06-codeacademy') || challenges[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#161B22] via-[#121620] to-[#0D1117] border border-[#30363D] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Plataforma de Crowdsourcing & Repositorios de Código</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¡Bienvenido, <span className="text-purple-400">{currentUser.displayName || currentUser.username}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Explora retos tecnológicos planteados por empresas de clase mundial, redacta tus
              algoritmos y sube tus soluciones para generar repositorios interactivos estilo GitHub.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('explorar')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-lg shadow-purple-900/40 transition-colors whitespace-nowrap"
            >
              <Rocket className="w-4 h-4" />
              <span>Explorar Retos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('mis-soluciones')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-200 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] rounded-lg transition-colors whitespace-nowrap"
            >
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              <span>Mis Soluciones ({solutions.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center shrink-0">
            <FolderGit2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">
              Soluciones Subidas
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                {solutions.length}
              </span>
              <span className="text-xs text-purple-400 font-mono">repos</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">
              Bolsa Total en Premios
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                ${totalBounty.toLocaleString('en-US')}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">USD</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Rocket className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">
              Retos Disponibles
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                {challenges.length}
              </span>
              <span className="text-xs text-indigo-400">empresas</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-600/15 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">
              Ganancias Ganadas
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tabular-nums">
                ${earnedBounty.toLocaleString('en-US')}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Latest Solutions & Featured Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Solutions Snapshot */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-purple-400" />
              <span>Tus Repositorios y Subidas Recientes</span>
            </h2>
            <button
              onClick={() => onNavigate('mis-soluciones')}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              <span>Ver todas ({solutions.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {solutions.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#161B22] border border-[#30363D] text-center space-y-3">
              <Code2 className="w-10 h-10 text-gray-600 mx-auto" />
              <p className="text-sm text-gray-300 font-medium">Aún no has subido soluciones</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Explora el catálogo de 13 problemas, redacta tu código y publícalo en tu repositorio.
              </p>
              <button
                onClick={() => onNavigate('explorar')}
                className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
              >
                Comenzar con un Reto
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {solutions.slice(0, 3).map((sol) => {
                const ch = challenges.find((c) => c.id === sol.challengeId);
                return (
                  <div
                    key={sol.id}
                    className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-purple-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="text-purple-400 font-mono font-semibold truncate">
                          {sol.repoName}
                        </span>
                        <span className="text-gray-600">·</span>
                        <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-[#0D1117] text-gray-300 font-mono">
                          {sol.language}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {ch?.title || 'Reto de Programación'}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1">{sol.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span
                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                          sol.status === 'aceptada'
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                            : sol.status === 'rechazada'
                            ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                            : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                        }`}
                      >
                        {sol.status === 'aceptada'
                          ? 'Aceptada'
                          : sol.status === 'rechazada'
                          ? 'Rechazada'
                          : 'En revisión'}
                      </span>

                      <button
                        onClick={() => onOpenSolutionRepo(sol)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-purple-900/30"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>Ver Código</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Quick Starter Card */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Reto Sugerido para Iniciar</span>
          </h2>

          <div className="p-5 rounded-xl bg-gradient-to-b from-[#161B22] to-[#0D1117] border border-purple-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-400">{starterChallenge.company}</span>
              <span className="text-emerald-400 font-mono font-bold">
                ${starterChallenge.reward.toLocaleString('en-US')} USD
              </span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">
              {starterChallenge.title}
            </h3>

            <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
              {starterChallenge.summary}
            </p>

            <div className="pt-2 border-t border-[#30363D] flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-400 bg-[#0D1117] px-2 py-0.5 rounded border border-[#30363D]">
                {starterChallenge.suggestedLanguage}
              </span>

              <button
                onClick={() => onNavigate('explorar')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Resolver Reto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Platform Info Box */}
          <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2 text-gray-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de Código & Escrow</span>
            </div>
            <p className="leading-relaxed">
              Todas las recompensas están custodiadas. Al enviar tu solución, se crea un repositorio
              aislado con historial de commits y visor de código en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
