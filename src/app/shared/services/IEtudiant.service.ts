import { Injectable } from '@angular/core';
import { EtudiantModel } from '../models/etudiant.model';
import { Observable, of } from 'rxjs';

export interface IEtudiantService {
    getAllEtudiants(): Observable<EtudiantModel[]> ;
    getById(Id: string): Observable<EtudiantModel> ;
    getListeAbsences(etudiantId: string): Observable<EtudiantModel> ;

    
}
