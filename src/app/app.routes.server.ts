import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Exclut la route paramétrée du prerender (SSR à la volée)
  { path: 'challenge/:cp', renderMode: RenderMode.Server },
  // Tout le reste peut être prerender
  { path: '**', renderMode: RenderMode.Prerender },
];

// (Optionnel) prerender de quelques /challenge/xxx connus à l’avance
export function getPrerenderParams() {
  const cps: string[] = []; // e.g. ['12345', 'ABCDEF']
  return cps.map(cp => ({ route: `/challenge/${cp}` }));
}
