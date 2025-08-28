// server.routes.ts  (A LA RACINE, même niveau que angular.json)
// @ts-nocheck
import { readFileSync } from 'node:fs';
import { join } from 'node:path';


export const serverRoutes = [
  {
    path: 'etudiant/:id',
    getPrerenderParams() {
      const file = join(process.cwd(), 'public', 'quest.json');
      const etudiants = JSON.parse(readFileSync(file, 'utf-8'));
      return etudiants.map((e: any) => ({ id: e.id }));
    },
  },
];
