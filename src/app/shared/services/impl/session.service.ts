import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISessionService } from '../ISessionService';
import { SessionModel } from '../../models/session.model';

@Injectable({
  providedIn: 'root' 
})
export class SessionService implements ISessionService{

  private apiUrl = 'http://localhost:8080/api/sessions/';

  
    getAllSessions(): Observable<any> {
      return this.httpClient.get<any>(this.apiUrl);
    }
    getById(Id: number): Observable<SessionModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }
    getListeAbsences(IdSession: number): Observable<SessionModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${IdSession}`);
    }

  constructor(private httpClient: HttpClient) { }
 
 
}
