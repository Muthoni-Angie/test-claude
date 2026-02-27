import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'lenegewa_auth';

  get isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) === '1';
  }

  login(): void {
    localStorage.setItem(this.KEY, '1');
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }
}
