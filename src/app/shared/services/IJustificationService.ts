import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JustificationModel } from '../models/Justification.model';

export interface IJustificationService {
   
    getAllJustifications(): Observable<JustificationModel> ;
    getByAbsenceId(justificationId: string): Observable<JustificationModel> ;
    traiterJustification(absenceId: string, statut: 'VALIDEE' | 'REFUSEE'): Observable<any>;

    
}
