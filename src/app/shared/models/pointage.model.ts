export interface PointageModel {

  id: string;
  nonEtudiant: string;
  nomEtudiant: string;
  prenomEtudiant: string;
  classeEtudiant: string;
  sessionId: string;
  type: 'ABSENCE' | 'PRESENT' | 'RETARD';
  justifiee: boolean;
  date: string;
  coursLibelle: string;
}
