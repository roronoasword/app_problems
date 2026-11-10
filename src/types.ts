export interface User {
  username: string;
  password?: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export type ChallengeCategory =
  | 'Logística'
  | 'Finanzas'
  | 'Energía'
  | 'Agricultura'
  | 'Salud'
  | 'Educación'
  | 'Entretenimiento'
  | 'Comercio'
  | 'Aviación'
  | 'Saneamiento'
  | 'Ciberseguridad'
  | 'Blockchain'
  | 'Transporte Urbano';

export type ChallengeStatus = 'activo' | 'resuelto';

export type SolutionStatus = 'en_revision' | 'aceptada' | 'rechazada';

export interface Challenge {
  id: string;
  number: number;
  company: string;
  location: string;
  industry: ChallengeCategory;
  title: string;
  summary: string;
  detailedDescription: string;
  technicalRequirements: string[];
  reward: number; // in USD
  tags: string[];
  suggestedLanguage: string;
  starterCode: string;
  defaultFileName: string;
  deadline: string;
  status: ChallengeStatus;
  proposalsCount?: number;
}

export interface Solution {
  id: string;
  challengeId: string;
  username: string;
  repoName: string;
  fileName: string;
  language: string;
  code: string;
  description: string;
  commitMessage: string;
  commitHash: string;
  submittedAt: string;
  status: SolutionStatus;
  executionOutput?: string;
}

export type NavigationTab = 'inicio' | 'mis-soluciones' | 'explorar';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
