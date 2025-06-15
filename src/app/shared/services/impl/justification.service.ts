import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { IJustificationService } from '../IJustificationService';
import { JustificationModel } from '../../models/Justification.model';
@Injectable({
  providedIn: 'root' 
})
export class JustificationService implements IJustificationService{

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/justifications';

  
    getAllJustifications(): Observable<any> {
      return this.httpClient.get<any>(this.apiUrl);
    }
   
    getById(justificationId: string): Observable<JustificationModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${justificationId}`);
    }
    getByAbsenceId(absenceId: string): Observable<JustificationModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${absenceId}`);
    }

    traiterJustification(absenceId: string, statut: 'VALIDEE' | 'REFUSEE'): Observable<any> {
      return this.httpClient.post(`https://gestion-absence-ism-dev.onrender.com/api/web/admin/${absenceId}/valider`, {
        statut
      });
    }

  constructor(private httpClient: HttpClient) { }

}
