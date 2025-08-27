import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';


interface QuestDB extends DBSchema {
  found: { key: string; value: { cp: string; ts: number } };
  meta: { key: string; value: any };
}


@Injectable({ providedIn: 'root' })
export class StorageService {
  private dbPromise = openDB<QuestDB>('ncquest-db', 1, {
    upgrade(db) {
      db.createObjectStore('found', { keyPath: 'cp' });
      db.createObjectStore('meta');
    }
  });


  async addFound(cp: string) {
    const db = await this.dbPromise;
    const already = await db.get('found', cp);
    if (!already) await db.put('found', { cp, ts: Date.now() });
  }
  async listFound() {
    const db = await this.dbPromise;
    return await db.getAll('found');
  }
  async setScore(score: number) {
    const db = await this.dbPromise;
    await db.put('meta', score, 'score');
  }
  async getScore() {
    const db = await this.dbPromise;
    return (await db.get('meta', 'score')) ?? 0;
  }
}
