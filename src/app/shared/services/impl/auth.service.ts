import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Role } from '../../models/user.model';
import { IAuthService } from '../IAuthService';

@Injectable({ providedIn: 'root' })
export class AuthService implements IAuthService {
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/utilisateurs/login'; 
    currentUserSignal = signal<User | null>(null);

  constructor(private http: HttpClient) {}


  Login(login: string, motDePasse: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}`, { login, motDePasse })
        .subscribe(response => {
          const utilisateur = response.results.utilisateur;
          const token = response.results.token;

          this.currentUserSignal.set(utilisateur);
          localStorage.setItem('token', token);

          observer.next(response);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }



  isAuthenticated(): boolean {
    return !!this.currentUserSignal();
  }

  Logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('token');
  }

  isAdmin(): boolean {
    return this.currentUserSignal()?.role === 'ADMIN';
  }

  hasRole(role: Role): boolean {
    return this.currentUserSignal()?.role === role;
  }

  getAdminId(): string | null {
    return this.currentUserSignal()?.id ?? null;
  }
}
