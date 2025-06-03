import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { EtudiantModel } from '../../models/etudiant.model';
import { AbsenceModel } from '../../models/absence.model';

// Singleton + Injection de dépendance
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/etudiants';

  getAllEtudiants(page = 0, size = 5): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
    getById(Id: number): Observable<EtudiantModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }
    getListeAbsences(IdEtudiant: number): Observable<EtudiantModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${IdEtudiant}`);
    }
    getListeAbsencesByEtudiantId(IdEtudiant: number): Observable<AbsenceModel> {
          return this.httpClient.get<any>(`${this.apiUrl}/${IdEtudiant}/absences`);
        }
    
  constructor(private httpClient: HttpClient) { }
}
