import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { EtudiantModel } from '../../models/etudiant.model';
import { PointageModel } from '../../models/pointage.model';

// Singleton + Injection de dépendance
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/etudiants';

    getAllEtudiants(page = 0, size = 5): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
    }
    getById(Id: string): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }
    getListeAbsences(etudiantId:string ): Observable<EtudiantModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${etudiantId}`);
    }
    getListeAbsencesByEtudiantId(etudiantId: string): Observable<any> {
          return this.httpClient.get<any>(`${this.apiUrl}/${etudiantId}/absences`);
        }
    
  constructor(private httpClient: HttpClient) { }
}
