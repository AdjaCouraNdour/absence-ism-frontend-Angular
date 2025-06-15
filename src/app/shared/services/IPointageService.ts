import { PointageModel } from '../models/pointage.model';
import { Observable } from 'rxjs';

export interface IPointageService {
       
     getAllPointages(): Observable<PointageModel[]> ;
     getAllPointagesByEtudiantId(IdEtudiant: String): Observable<PointageModel> ;
     getById(Id: string): Observable<PointageModel> ;
 
}
