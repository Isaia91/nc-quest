import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QrVerifyService } from '../../core/services/qr-verify.service';
import { StorageService } from '../../core/services/storage.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-scan',
  templateUrl: './scan.html',
  styleUrls: ['./scan.css']
})
export class ScanComponent implements OnDestroy {
  status = 'Prêt à scanner';
  private stream?: MediaStream;
  private video?: HTMLVideoElement;
  private rafId?: number;
  private codeReader?: any;


  constructor(private verify: QrVerifyService, private storage: StorageService, private router: Router) {}


  async start() {
    this.status = 'Initialisation caméra…';
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      this.video = document.querySelector('video')!;
      this.video.srcObject = this.stream;
      await this.video.play();
      this.status = 'Scan en cours…';
      const { BrowserMultiFormatReader } = await import('@zxing/browser');
      this.codeReader = new BrowserMultiFormatReader();
      this.codeReader.decodeFromVideoElement(this.video, (res: any, err: any) => {
        if (res) this.handleResult(res.getText());
      });
    } catch (e: any) {
      this.status = 'Erreur caméra: ' + (e?.message ?? e);
    }
  }


  stop() {
    try { this.codeReader?.reset(); } catch {}
    this.stream?.getTracks().forEach(t => t.stop());
    this.status = 'Scan arrêté';
  }


  async handleResult(text: string) {
    this.stop();
    const res = this.verify.validateUrl(text);
    if (!res.ok || !res.cp) { this.status = res.error ?? 'QR invalide'; return; }
    await this.storage.addFound(res.cp);
    this.router.navigate(['/challenge', res.cp]);
  }


  ngOnDestroy() { this.stop(); }
}
