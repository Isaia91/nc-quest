import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class QrVerifyService {
// TODO: remplacer par vérif côté serveur (POST /api/validate)
  validateUrl(text: string): { ok: boolean; cp?: string; error?: string } {
    try {
      const url = new URL(text);
      const cp = url.searchParams.get('cp') ?? undefined;
      const ts = Number(url.searchParams.get('ts'));
      const sig = url.searchParams.get('sig');
      if (!cp || !ts || !sig) return { ok: false, error: 'Paramètres manquants' };
      // Vérif TTL 48h
      const maxAge = 1000 * 60 * 60 * 48;
      if (Date.now() - ts > maxAge) return { ok: false, error: 'QR expiré' };
    // Vérif light (ex: longueur de sig)
      if (sig.length < 16) return { ok: false, error: 'Signature invalide' };
      return { ok: true, cp };
    } catch {
      return { ok: false, error: 'QR non reconnu' };
    }
  }
}
