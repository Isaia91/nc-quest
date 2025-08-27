import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import {FormsModule} from '@angular/forms';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge.html',
  styleUrls: ['./challenge.css']
})
export class ChallengeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storage = inject(StorageService);


  cp = this.route.snapshot.paramMap.get('cp')!;
  question = '';
  hint = '';
  type: 'quiz' | 'code' = 'quiz';
  private answers: (string | RegExp)[] = [];
  input = signal('');


  constructor() { this.loadConfig(); }


  async loadConfig() {
    const res = await fetch('/assets/quests.json');
    const cfg = await res.json();
    const cp = cfg.checkpoints.find((c: any) => c.id === this.cp);
    if (!cp) { this.router.navigateByUrl('/'); return; }
    if (cp.challenge.type === 'quiz') {
      this.type = 'quiz';
      this.question = cp.challenge.question;
      this.answers = (cp.challenge.answers || []).map((a: string) => a.toLowerCase());
    } else {
      this.type = 'code';
      this.hint = cp.challenge.hint;
      this.answers = [new RegExp(cp.challenge.pattern)];
    }
  }


  async validate() {
    const val = this.input().trim();
    const ok = this.answers.some(a => a instanceof RegExp ? a.test(val) : a === val.toLowerCase());
    if (ok) {
      const current = await this.storage.getScore();
      await this.storage.setScore(current + 100);
      alert('Bravo ! +100 points');
      this.router.navigateByUrl('/');
    } else {
      alert('Presque ! Réessaie.');
    }
  }
}
