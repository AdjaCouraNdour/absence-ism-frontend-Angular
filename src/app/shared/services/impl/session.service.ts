import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISessionService } from '../ISessionService';
import { SessionModel } from '../../models/session.model';

@Injectable({
  providedIn: 'root' 
})
export class SessionService implements ISessionService{

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/sessions';                    
  
    getSessionsDuJour(): Observable<any>  {
      const date = this.getDateDuJour();
      return this.httpClient.get<any[]>(`${this.apiUrl}?date=${encodeURIComponent(date)}`);
    }
    
    getDateDuJour(): string {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`; 
    }
    
    getAllSessions(): Observable<any> {
      return this.httpClient.get<any>(this.apiUrl);
    }
    getById(Id: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }
  constructor(private httpClient: HttpClient) { }
 
 
}
