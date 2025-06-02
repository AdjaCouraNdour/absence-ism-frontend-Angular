import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { AbsenceModel } from '../../models/absence.model';
import { IPointageService } from '../IPointageService';

// Singleton + Injection de dépendance
@Injectable({
  providedIn: 'root' 
})
export class PointageService implements IPointageService{

  private apiUrl = 'http://localhost:8080/api/pointages/';

    getAllPointages(): Observable<AbsenceModel[]> {
      return this.httpClient.get<any>(this.apiUrl);
    }
    getAllPointagesByEtudiantId(IdEtudiant: String): Observable<AbsenceModel> {
    throw new Error('Method not implemented.');
    } 
    getById(Id: number): Observable<AbsenceModel> {
      return this.httpClient.get<any>(`${this.apiUrl}/${Id}`);
    }

  constructor(private httpClient: HttpClient) { }
 
}
