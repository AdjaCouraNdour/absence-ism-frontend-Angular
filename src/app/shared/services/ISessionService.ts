import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SessionModel } from '../models/session.model';

export interface ISessionService {
    getAllSessions(): Observable<SessionModel> ;
    getById(Id: string): Observable<SessionModel> ;
    getSessionsDuJour() : Observable<SessionModel>;

}
