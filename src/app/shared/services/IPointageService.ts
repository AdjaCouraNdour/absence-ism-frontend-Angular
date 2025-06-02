import { AbsenceModel } from '../models/absence.model';
import { Observable } from 'rxjs';

export interface IPointageService {

     getAllPointages(): Observable<AbsenceModel[]> ;
     getAllPointagesByEtudiantId(IdEtudiant: String): Observable<AbsenceModel> ;
     getById(Id: number): Observable<AbsenceModel> ;
 
}
