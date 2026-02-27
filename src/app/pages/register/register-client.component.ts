import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss'],
})
export class RegisterClientComponent implements AfterViewInit {
  @ViewChild('agreementCanvas') agreementCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('consentCanvas') consentCanvas!: ElementRef<HTMLCanvasElement>;

  step: 1 | 2 = 1;
  clientName = '';

  // Agreement canvas state
  private agCtx!: CanvasRenderingContext2D;
  private agDrawing = false;
  hasSig = false;

  // Consent canvas state
  private csCtx!: CanvasRenderingContext2D;
  private csDrawing = false;
  hasConsentSig = false;

  constructor(
    private readonly location: Location,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.initCanvas(this.agreementCanvas, (ctx) => (this.agCtx = ctx));
  }

  // ── Agreement ──────────────────────────────────────────────────────────────

  agStart(e: MouseEvent): void {
    this.agDrawing = true;
    this.agCtx.beginPath();
    this.agCtx.moveTo(e.offsetX, e.offsetY);
  }

  agDraw(e: MouseEvent): void {
    if (!this.agDrawing) return;
    this.hasSig = true;
    this.agCtx.lineTo(e.offsetX, e.offsetY);
    this.agCtx.stroke();
  }

  agStop(): void {
    this.agDrawing = false;
  }

  agClear(): void {
    const c = this.agreementCanvas.nativeElement;
    this.agCtx.clearRect(0, 0, c.width, c.height);
    this.hasSig = false;
  }

  confirmAgreement(): void {
    if (!this.clientName.trim() || !this.hasSig) return;
    this.step = 2;
    setTimeout(() => {
      this.initCanvas(this.consentCanvas, (ctx) => (this.csCtx = ctx));
    }, 0);
  }

  // ── Data Consent ───────────────────────────────────────────────────────────

  csStart(e: MouseEvent): void {
    this.csDrawing = true;
    this.csCtx.beginPath();
    this.csCtx.moveTo(e.offsetX, e.offsetY);
  }

  csDraw(e: MouseEvent): void {
    if (!this.csDrawing) return;
    this.hasConsentSig = true;
    this.csCtx.lineTo(e.offsetX, e.offsetY);
    this.csCtx.stroke();
  }

  csStop(): void {
    this.csDrawing = false;
  }

  csClear(): void {
    const c = this.consentCanvas.nativeElement;
    this.csCtx.clearRect(0, 0, c.width, c.height);
    this.hasConsentSig = false;
  }

  confirmConsent(): void {
    if (!this.hasConsentSig) return;
    this.router.navigate(['/clients', 'new', 'intake']);
  }

  // ── Shared ─────────────────────────────────────────────────────────────────

  goBack(): void {
    if (this.step === 2) {
      this.step = 1;
    } else {
      this.location.back();
    }
  }

  private initCanvas(
    ref: ElementRef<HTMLCanvasElement>,
    assign: (ctx: CanvasRenderingContext2D) => void
  ): void {
    const canvas = ref.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    assign(ctx);
  }
}
