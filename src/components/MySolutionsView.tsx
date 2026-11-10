import React, { useState } from 'react';
import { Solution, Challenge } from '../types';
import {
  FolderGit2,
  GitBranch,
  ExternalLink,
  Code2,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Play,
  FileCode,
  DollarSign,
  Search,
} from 'lucide-react';

interface MySolutionsViewProps {
  solutions: Solution[];
  challenges: Challenge[];
  onOpenRepo: (solution: Solution) => void;
  onExploreChallenges: () => void;
}

export const MySolutionsView: React.FC<MySolutionsViewProps> = ({
  solutions,
  challenges,
  onOpenRepo,
  onExploreChallenges,
}) => {
  const [filterStatus, setFilterStatus] = useState<'todos' | 'en_revision' | 'aceptada' | 'rechazada'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const getChallenge = (challengeId: string) => {
    return challenges.find((c) => c.id === challengeId);
  };

  const filteredSolutions = solutions.filter((sol) => {
    if (filterStatus !== 'todos' && sol.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const ch = getChallenge(sol.challengeId);
      const matchRepo = sol.repoName.toLowerCase().includes(q);
      const matchDesc = sol.description.toLowerCase().includes(q);
      const matchCompany = ch?.company.toLowerCase().includes(q) || false;
      const matchTitle = ch?.title.toLowerCase().includes(q) || false;
      if (!matchRepo && !matchDesc && !matchCompany && !matchTitle) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Gestor de Entregas & Repositorios de Código</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Mis Soluciones Subidas
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Gestiona los repositorios que has enviado a los retos empresariales. Haz clic en{' '}
            <strong className="text-purple-300 font-semibold">"Ver Código / Entrar a tu GitHub"</strong>{' '}
            para inspeccionar el visor de repositorio interactivo.
          </p>
        </div>

        <div className="p-4 bg-[#0D1117] border border-purple-500/30 rounded-xl text-right shrink-0">
          <span className="text-[11px] uppercase tracking-wider text-purple-400 block font-semibold">
            Total de Subidas
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
            {solutions.length}
          </span>
          <span className="text-[11px] text-gray-400 block">repositorios creados</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en tus soluciones por repo o empresa..."
            className="w-full pl-9 pr-3 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs">
          <button
            onClick={() => setFilterStatus('todos')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === 'todos'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Todas ({solutions.length})
          </button>
          <button
            onClick={() => setFilterStatus('en_revision')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === 'en_revision'
                ? 'bg-amber-600/80 text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            En revisión
          </button>
          <button
            onClick={() => setFilterStatus('aceptada')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterStatus === 'aceptada'
                ? 'bg-emerald-600/80 text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Aceptadas
          </button>
        </div>
      </div>

      {/* Solutions Cards Grid */}
      {filteredSolutions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#161B22] border border-[#30363D] space-y-3">
          <FolderGit2 className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-base font-bold text-gray-200">
            No se encontraron soluciones con este criterio
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
            Explora los 13 retos empresariales, escribe tu código y envíalo para generar tu
            primer repositorio.
          </p>
          <button
            onClick={onExploreChallenges}
            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors mt-2"
          >
            Ir al Catálogo de Retos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredSolutions.map((sol) => {
            const ch = getChallenge(sol.challengeId);
            return (
              <div
                key={sol.id}
                className="p-5 rounded-xl bg-[#161B22] border border-[#30363D] hover:border-purple-500/50 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
              >
                <div>
                  {/* Card Header: Challenge info and status */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                        <span className="font-semibold text-gray-300">{ch?.company || 'Empresa'}</span>
                        <span className="text-gray-600">·</span>
                        <span className="text-purple-400">{ch?.industry}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                        {ch?.title || 'Desafío Técnico'}
                      </h3>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border shrink-0 ${
                        sol.status === 'aceptada'
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : sol.status === 'rechazada'
                          ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                          : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      {sol.status === 'aceptada'
                        ? 'Aceptada / Ganadora'
                        : sol.status === 'rechazada'
                        ? 'Rechazada'
                        : 'En revisión'}
                    </span>
                  </div>

                  {/* GitHub Repo Capsule */}
                  <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg mb-3 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate text-purple-400 font-semibold">
                      <GitBranch className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{sol.repoName}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-[#161B22] px-2 py-0.5 rounded border border-[#30363D] uppercase">
                      {sol.language}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                    {sol.description}
                  </p>
                </div>

                {/* Card Footer: Metadata & Primary Action Button */}
                <div className="pt-3 border-t border-[#30363D] flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="text-gray-500 block text-[10px] uppercase font-mono">
                      Recompensa en Juego
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      ${ch?.reward.toLocaleString('en-US')} USD
                    </span>
                  </div>

                  {/* Mandatory Direct Button: "Ver Código / Entrar a tu GitHub" */}
                  <button
                    type="button"
                    onClick={() => onOpenRepo(sol)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-md shadow-purple-900/40 flex items-center gap-2 whitespace-nowrap"
                  >
                    <GitBranch className="w-4 h-4 text-purple-200" />
                    <span>Ver Código / Entrar a tu GitHub</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
