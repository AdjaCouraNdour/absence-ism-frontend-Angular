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
   
    getById(justificationId: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/${justificationId}`);
    }
    getByAbsenceId(absenceId: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/${absenceId}/justification`);
    }

   traiterJustification(justificationId: string, statut: 'VALIDEE' | 'REFUSEE'): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.httpClient.post(
      `https://gestion-absence-ism-dev.onrender.com/api/web/admin/${justificationId}/valider`,
      { statut },
      { headers }
    );

    //  this.http.put(`${this.baseUrl}/justifications/valider/${this.justificationId}`, null)
    //   .subscribe({
    //     next: () => {
    //       alert('Justification validée.');
    //       this.router.navigate(['/admin/dashboard-admin']);
    //     },
    //     error: (err) => {
    //       alert('Erreur validation : ' + err.message);
    //     }
    //   });
  }



  constructor(private httpClient: HttpClient) { }

}
