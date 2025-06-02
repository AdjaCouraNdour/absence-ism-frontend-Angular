import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse, Role, User } from '../../models/user.model';
import { MOCK_USER } from '../../mocks/user.mock';
import { IAuthService } from '../IAuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements IAuthService {

  
  currentUserSignal = signal<User|null>(null);
  constructor() { }
  
  Login(username: string, password: string): Observable<LoginResponse> {
    const userConnect = MOCK_USER.find((user : User) => user.login === username && user.password === password);
    if (userConnect) {
      this.currentUserSignal.set(userConnect);
      return of({
        message : 'login succesful',
        success : true,
        data : userConnect
      });
    }else{
      return of({
        message : 'login baxoul',
        success : false,
        data : null
      }); 
    }
  }
  isAuthenticated(): boolean {
    return !!this.currentUserSignal();
  }
  Logout(): void {
    this.currentUserSignal.set(null);
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.currentUserSignal()?.role === 'ADMIN';
  }

  hasRole(role: Role): boolean {
    return this.isAuthenticated() && this.currentUserSignal()?.role === role;
  }
  getAdminId(): number | null {
    return this.currentUserSignal()?.id ?? null;
  }
  
}
