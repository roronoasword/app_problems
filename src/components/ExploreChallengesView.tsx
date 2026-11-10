import React, { useState, useMemo } from 'react';
import { Challenge, Solution } from '../types';
import {
  Search,
  Filter,
  DollarSign,
  Rocket,
  CheckCircle2,
  Calendar,
  Code2,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ExploreChallengesViewProps {
  challenges: Challenge[];
  solutions: Solution[];
  onOpenSubmitModal: (challenge: Challenge) => void;
  onViewSubmittedSolution: (solution: Solution) => void;
}

export const ExploreChallengesView: React.FC<ExploreChallengesViewProps> = ({
  challenges,
  solutions,
  onOpenSubmitModal,
  onViewSubmittedSolution,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<'reward-desc' | 'number-asc' | 'deadline'>('number-asc');

  // Compute industries
  const industries = useMemo(() => {
    const set = new Set<string>();
    challenges.forEach((c) => set.add(c.industry));
    return ['Todas', ...Array.from(set)];
  }, [challenges]);

  // Check which challenges have user solutions
  const userSolutionsMap = useMemo(() => {
    const map = new Map<string, Solution>();
    solutions.forEach((s) => map.set(s.challengeId, s));
    return map;
  }, [solutions]);

  // Filter & Sort
  const filteredChallenges = useMemo(() => {
    return challenges
      .filter((c) => {
        if (selectedIndustry !== 'Todas' && c.industry !== selectedIndustry) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCompany = c.company.toLowerCase().includes(q);
          const matchTitle = c.title.toLowerCase().includes(q);
          const matchSummary = c.summary.toLowerCase().includes(q);
          const matchTags = c.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchCompany && !matchTitle && !matchSummary && !matchTags) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'reward-desc') return b.reward - a.reward;
        if (sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        return a.number - b.number;
      });
  }, [challenges, selectedIndustry, searchQuery, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
            <Rocket className="w-4 h-4" />
            <span>Catálogo Completo de Retos Empresariales</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Explora los 13 Problemas Activos
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
            Elige cualquier desafío técnico, redacta tu código fuente (o inserta un script inicial)
            y envíalo para registrarlo automáticamente en tus repositorios de GitHub.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-center">
            <span className="text-[10px] text-gray-400 uppercase font-mono block">Retos</span>
            <span className="text-xl font-bold font-mono text-purple-400">13</span>
          </div>
          <div className="p-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-center">
            <span className="text-[10px] text-gray-400 uppercase font-mono block">Entregadas</span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {solutions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filter & Sort */}
      <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por empresa, tecnología o problema (ej. Python, IoT, Blockchain, Hola Mundo)..."
              className="w-full pl-9 pr-3 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs font-medium text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="number-asc">Orden del Reto (#1 al #13)</option>
              <option value="reward-desc">Mayor Recompensa (USD)</option>
              <option value="deadline">Próximos a Vencer</option>
            </select>
          </div>
        </div>

        {/* Industry Chips Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-gray-400 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-gray-500" />
            Industria:
          </span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedIndustry === ind
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'bg-[#0D1117] text-gray-400 hover:text-gray-200 hover:bg-[#21262D]'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* 13 Challenges Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChallenges.map((challenge) => {
          const userSolution = userSolutionsMap.get(challenge.id);
          const hasSubmitted = Boolean(userSolution);

          return (
            <article
              key={challenge.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all duration-200 hover:shadow-xl group ${
                hasSubmitted
                  ? 'bg-gradient-to-b from-[#161B22] to-[#121620] border-purple-500/40 shadow-purple-950/20'
                  : 'bg-[#161B22] border-[#30363D] hover:border-purple-500/50'
              }`}
            >
              <div>
                {/* Header: Challenge Number, Company & Category */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] font-bold text-purple-400 bg-purple-950/60 border border-purple-500/30 px-1.5 py-0.2 rounded">
                      #{challenge.number}
                    </span>
                    <span className="font-semibold text-gray-200 truncate">{challenge.company}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-purple-400 truncate">{challenge.industry}</span>
                  </div>

                  {hasSubmitted && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                      <Check className="w-3 h-3" />
                      Subida
                    </span>
                  )}
                </div>

                {/* Challenge Title */}
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug mb-2 line-clamp-2">
                  {challenge.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mb-4">
                  {challenge.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-gray-300 bg-[#0D1117] border border-[#30363D] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#30363D]">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 block font-mono">
                      Recompensa
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                        ${challenge.reward.toLocaleString('en-US')}
                      </span>
                      <span className="text-xs text-emerald-500 font-semibold">USD</span>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-gray-500 block text-[10px] uppercase font-mono">
                      Fecha Límite
                    </span>
                    <span className="text-gray-300 font-mono font-medium">
                      {challenge.deadline}
                    </span>
                  </div>
                </div>

                {/* Submit / Inspect Button */}
                {hasSubmitted && userSolution ? (
                  <button
                    type="button"
                    onClick={() => onViewSubmittedSolution(userSolution)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Ver en Mis Soluciones</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenSubmitModal(challenge)}
                    className="w-full py-2.5 px-3 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-md shadow-purple-900/30 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                  >
                    <Code2 className="w-4 h-4 text-purple-200" />
                    <span>Redactar Solución / Subir Código</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
