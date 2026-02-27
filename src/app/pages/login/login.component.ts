import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  submit(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.auth.login();
      this.loading = false;
      this.router.navigateByUrl('/dashboard');
    }, 600);
  }
}

