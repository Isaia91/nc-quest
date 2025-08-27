import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';


@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.html',
  styleUrls: ['./progress.css']
})
export class ProgressComponent implements OnInit {
  found: { cp: string; ts: number }[] = [];
  score = 0;
  constructor(private storage: StorageService) {}
  async ngOnInit() {
    this.found = await this.storage.listFound();
    this.score = await this.storage.getScore();
  }
}
