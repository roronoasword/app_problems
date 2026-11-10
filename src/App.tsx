/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  Challenge,
  Solution,
  NavigationTab,
  ToastMessage,
} from './types';
import {
  DEFAULT_USERS,
  INITIAL_CHALLENGES,
  INITIAL_SOLUTIONS,
} from './mockData';
import { AuthScreen } from './components/AuthScreen';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MySolutionsView } from './components/MySolutionsView';
import { ExploreChallengesView } from './components/ExploreChallengesView';
import { SubmitSolutionModal } from './components/SubmitSolutionModal';
import { GitHubRepoViewerModal } from './components/GitHubRepoViewerModal';
import { ToastContainer } from './components/Toast';
import { RotateCcw } from 'lucide-react';

const STORAGE_USER_KEY = 'nexussolve_active_user_v2';
const STORAGE_USERS_LIST_KEY = 'nexussolve_registered_users_v2';
const STORAGE_CHALLENGES_KEY = 'nexussolve_challenges_v2';
const STORAGE_SOLUTIONS_KEY = 'nexussolve_solutions_v2';

export default function App() {
  // Registered Users in localStorage
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_LIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_USERS;
  });

  // Current Logged-in User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default null to show onboarding/auth screen
    return null;
  });

  // 13 Challenges
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHALLENGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CHALLENGES;
  });

  // Solutions Submitted
  const [solutions, setSolutions] = useState<Solution[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SOLUTIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SOLUTIONS;
  });

  // Navigation (3 Main Control Buttons: Inicio, Mis Soluciones, Explorar Problemas)
  const [activeTab, setActiveTab] = useState<NavigationTab>('inicio');

  // Modals
  const [submitModalChallenge, setSubmitModalChallenge] = useState<Challenge | null>(null);
  const [repoViewerSolution, setRepoViewerSolution] = useState<Solution | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_USERS_LIST_KEY, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CHALLENGES_KEY, JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SOLUTIONS_KEY, JSON.stringify(solutions));
  }, [solutions]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    addToast(
      'success',
      `¡Bienvenido, ${user.displayName || user.username}!`,
      'Has ingresado exitosamente a la plataforma de retos y repositorios.'
    );
  };

  const handleRegisterUser = (newUser: User) => {
    setRegisteredUsers((prev) => [...prev, newUser]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('inicio');
    addToast('info', 'Sesión cerrada', 'Has salido de tu cuenta de forma segura.');
  };

  // Submit Solution Handler (Section 4 Rule: Automatically moves to Mis Soluciones)
  const handleSubmitSolution = (
    data: Omit<Solution, 'id' | 'submittedAt' | 'status' | 'commitHash'>
  ) => {
    const newSolution: Solution = {
      ...data,
      id: `sol-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'en_revision',
      commitHash: Math.random().toString(16).substring(2, 9),
    };

    setSolutions((prev) => [newSolution, ...prev]);

    // Toast feedback
    addToast(
      'success',
      '¡Solución enviada y registrada!',
      `Se ha creado el repositorio ${newSolution.repoName}. Puedes inspeccionar el visor de código ahora.`
    );

    // Key rule: switch automatically to "Mis Soluciones" (Botón 2)
    setActiveTab('mis-soluciones');

    // Open the interactive GitHub repository viewer immediately
    setRepoViewerSolution(newSolution);
  };

  // Reset Data to Initial
  const handleResetData = () => {
    setChallenges(INITIAL_CHALLENGES);
    setSolutions(INITIAL_SOLUTIONS);
    setRegisteredUsers(DEFAULT_USERS);
    localStorage.removeItem(STORAGE_CHALLENGES_KEY);
    localStorage.removeItem(STORAGE_SOLUTIONS_KEY);
    localStorage.removeItem(STORAGE_USERS_LIST_KEY);
    addToast(
      'success',
      'Datos restablecidos',
      'Se han reinicializado los 13 retos empresariales y las soluciones de prueba de Angelo2008.'
    );
  };

  // If unauthenticated, show modern onboarding / login screen
  if (!currentUser) {
    return (
      <>
        <AuthScreen
          onLogin={handleLogin}
          registeredUsers={registeredUsers}
          onRegisterUser={handleRegisterUser}
        />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </>
    );
  }

  // Active user's solutions
  const userSolutions = solutions.filter(
    (s) => s.username.toLowerCase() === currentUser.username.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-gray-100 selection:bg-purple-600 selection:text-white">
      {/* Top Navbar with the 3 Control Buttons */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        solutionsCount={userSolutions.length}
      />

      {/* Main Multi-Tab Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Botón 1: 🏠 Inicio (Dashboard / Bienvenida) */}
        {activeTab === 'inicio' && (
          <DashboardView
            currentUser={currentUser}
            challenges={challenges}
            solutions={userSolutions}
            onNavigate={setActiveTab}
            onOpenSolutionRepo={(sol) => setRepoViewerSolution(sol)}
          />
        )}

        {/* Botón 2: 📂 Mis Soluciones (Tus Subidas) */}
        {activeTab === 'mis-soluciones' && (
          <MySolutionsView
            solutions={userSolutions}
            challenges={challenges}
            onOpenRepo={(sol) => setRepoViewerSolution(sol)}
            onExploreChallenges={() => setActiveTab('explorar')}
          />
        )}

        {/* Botón 3: 🚀 Explorar Problemas */}
        {activeTab === 'explorar' && (
          <ExploreChallengesView
            challenges={challenges}
            solutions={userSolutions}
            onOpenSubmitModal={(ch) => setSubmitModalChallenge(ch)}
            onViewSubmittedSolution={(sol) => {
              setActiveTab('mis-soluciones');
              setRepoViewerSolution(sol);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#30363D] bg-[#0D1117] py-6 px-4 text-xs text-gray-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-300">NexusSolve Code Hub</span>
            <span aria-hidden="true">·</span>
            <span>Plataforma de Retos Empresariales e Intercambio de Código</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
              title="Restablece los 13 retos empresariales y las soluciones iniciales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer 13 retos y datos</span>
            </button>
            <span aria-hidden="true" className="text-gray-700">·</span>
            <span className="font-mono text-purple-400">Usuario: {currentUser.username}</span>
          </div>
        </div>
      </footer>

      {/* Submit Solution Code Editor Modal */}
      <SubmitSolutionModal
        challenge={submitModalChallenge}
        isOpen={Boolean(submitModalChallenge)}
        onClose={() => setSubmitModalChallenge(null)}
        onSubmit={handleSubmitSolution}
        currentUsername={currentUser.username}
      />

      {/* GitHub Interactive Repository Viewer Modal */}
      <GitHubRepoViewerModal
        solution={repoViewerSolution}
        challenge={
          repoViewerSolution
            ? challenges.find((c) => c.id === repoViewerSolution.challengeId) || null
            : null
        }
        isOpen={Boolean(repoViewerSolution)}
        onClose={() => setRepoViewerSolution(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
