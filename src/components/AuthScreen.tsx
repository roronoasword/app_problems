import React, { useState } from 'react';
import { User } from '../types';
import {
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Code2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  registeredUsers: User[];
  onRegisterUser: (newUser: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLogin,
  registeredUsers,
  onRegisterUser,
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('Angelo2008');
  const [password, setPassword] = useState('Sago2008');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuickDemoLogin = () => {
    setUsername('Angelo2008');
    setPassword('Sago2008');
    const target = registeredUsers.find((u) => u.username.toLowerCase() === 'angelo2008') || {
      username: 'Angelo2008',
      displayName: 'Angelo García',
      bio: 'Desarrollador Full-Stack & Ingeniero de Software.',
      createdAt: '2026-11-01',
    };
    onLogin(target);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor ingrese usuario y contraseña.');
      return;
    }

    if (isRegistering) {
      // Check if user exists
      const exists = registeredUsers.some(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase()
      );
      if (exists) {
        setErrorMessage('Este nombre de usuario ya está registrado.');
        return;
      }

      const newUser: User = {
        username: username.trim(),
        password: password.trim(),
        displayName: displayName.trim() || username.trim(),
        bio: 'Desarrollador en NexusSolve',
        createdAt: new Date().toISOString().substring(0, 10),
      };

      onRegisterUser(newUser);
      onLogin(newUser);
    } else {
      // Login check
      const found = registeredUsers.find(
        (u) =>
          u.username.toLowerCase() === username.trim().toLowerCase() &&
          u.password === password.trim()
      );

      if (found) {
        onLogin(found);
      } else {
        // Allow default fallback if Angelo2008 / Sago2008
        if (
          username.trim().toLowerCase() === 'angelo2008' &&
          password.trim() === 'Sago2008'
        ) {
          const defaultUser: User = {
            username: 'Angelo2008',
            displayName: 'Angelo García',
            bio: 'Desarrollador Full-Stack & Ingeniero de Software.',
            createdAt: '2026-11-01',
          };
          onLogin(defaultUser);
        } else {
          setErrorMessage('Credenciales incorrectas. Verifique usuario y contraseña.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#090D16] relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Modern Onboarding Card */}
      <div className="relative w-full max-w-md bg-[#0D1117]/95 border border-[#30363D] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl text-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-0.5 shadow-xl shadow-purple-900/40 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-[#0D1117] rounded-[14px] flex items-center justify-center">
              <Code2 className="w-7 h-7 text-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Nexus<span className="text-purple-400">Solve</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Plataforma de retos empresariales y repositorios de código colaborativo
          </p>
        </div>

        {/* Quick Demo Preloaded Card per instructions */}
        <div className="mb-5 p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between text-xs">
          <div>
            <span className="text-purple-300 font-bold block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Credenciales precargadas:
            </span>
            <span className="text-gray-300 font-mono text-[11px]">
              Usuario: <strong className="text-white">Angelo2008</strong> · Pass: <strong className="text-white">••••••••</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="px-2.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            Entrar directo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tab Selector: Iniciar Sesión / Registro */}
          <div className="grid grid-cols-2 p-1 bg-[#161B22] border border-[#30363D] rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(false);
                setErrorMessage('');
              }}
              className={`py-1.5 rounded-md transition-all ${
                !isRegistering
                  ? 'bg-purple-600 text-white font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(true);
                setErrorMessage('');
              }}
              className={`py-1.5 rounded-md transition-all ${
                isRegistering
                  ? 'bg-purple-600 text-white font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Nuevo Registro
            </button>
          </div>

          {/* Display Name when registering */}
          {isRegistering && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Nombre Completo o Alias
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ej. Angelo García"
                className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#30363D] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Usuario de Plataforma
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Angelo2008"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#090D16] border border-[#30363D] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
              />
            </div>
          </div>

          {/* Password (Masked with dots) */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-[#090D16] border border-[#30363D] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-xs text-rose-400 bg-rose-950/30 border border-rose-500/30 p-2.5 rounded-lg leading-relaxed">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2"
          >
            <span>{isRegistering ? 'Crear Cuenta y Comenzar' : 'Acceder a la Plataforma'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Feature Badges */}
        <div className="mt-6 pt-5 border-t border-[#30363D] flex items-center justify-around text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Sesión Local
          </span>
          <span className="flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" /> Visor GitHub
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 13 Desafíos
          </span>
        </div>
      </div>
    </div>
  );
};
