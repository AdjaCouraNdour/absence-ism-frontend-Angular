import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJustificationService } from '../IJustificationService';

@Injectable({
  providedIn: 'root'
})
export class JustificationService implements IJustificationService {

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/justifications';

  constructor(private httpClient: HttpClient) {}

  getAllJustifications(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }

  getById(justificationId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${justificationId}`);
  }

  getByAbsenceId(absenceId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${absenceId}/justification`);
  }

  traiterJustification(justificationId: string, statut: 'VALIDEE' | 'REFUSEE'): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const action = statut === 'VALIDEE' ? 'valider' : 'refuser';
    return this.httpClient.post(
      `https://gestion-absence-ism-dev.onrender.com/api/web/admin/${justificationId}/justifications/${action}`,
      {},
      { headers }
    );
  }
}
