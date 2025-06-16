import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { JustificationModel } from '../../../shared/models/Justification.model';
import { CommonModule } from '@angular/common';
import { EtudiantModel } from '../../../shared/models/etudiant.model';
import { EtudiantService } from '../../../shared/services/impl/etudiant.service';
import { SessionService } from '../../../shared/services/impl/session.service';
import { SessionModel } from '../../../shared/models/session.model';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class JustificationComponent implements OnInit {
  private justificationService = inject(JustificationService);
  private etudiantService = inject(EtudiantService);
  private sessionService = inject(SessionService);
  private route = inject(ActivatedRoute);
  constructor(private router : Router ) {
  }

  justificationDetails: JustificationModel | null = null;
  justificationId!: string;

  etudiant: EtudiantModel | null = null;
  etudiantId!: string;

  session: SessionModel | null = null;
  sessionId!: string;

  loading = true;

  ngOnInit(): void {
    this.justificationId = this.route.snapshot.paramMap.get('justificationId')!;
    this.etudiantId = this.route.snapshot.paramMap.get('etudiantId')!;
    this.sessionId = this.route.snapshot.paramMap.get('sessionId')!;
    this.chargerJustification(this.justificationId);
    this.chargerEtudiant(this.etudiantId);
    this.chargerSession(this.sessionId);
  }


  private chargerJustification(id: string) {
    this.justificationService.getById(id).subscribe({
      next: (data) => {
        this.justificationDetails = data.results;
        console.log('Justification chargée :', data);
        this.checkIfLoadingDone();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la justification :', err);
        this.checkIfLoadingDone();
      }
    });
  }

  private chargerEtudiant(id: string) {
    this.etudiantService.getById(id).subscribe({
      next: (data) => {
        this.etudiant = data?.results ?? null;
        console.log('Étudiant chargé :', this.etudiant);
        this.checkIfLoadingDone();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l’étudiant :', err);
        this.checkIfLoadingDone();
      }
    });
  }

  private chargerSession(id: string) {
    this.sessionService.getById(id).subscribe({
      next: (data) => {
        this.session = data;
        console.log('Session chargée :', data);
        this.checkIfLoadingDone();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la session :', err);
        this.checkIfLoadingDone();
      }
    });
  }

  private checkIfLoadingDone() {
    if (this.justificationDetails && this.etudiant && this.session) {
      this.loading = false;
    }
  }

 validerJustification() {
  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  this.justificationService.traiterJustification(this.justificationId, 'VALIDEE').subscribe({
    next: () => {
      this.justificationDetails!.statut = 'VALIDEE';
      alert('Justification validée');
      this.router.navigate(['/admin']); 
    },
    error: (err) => {
      console.error('Erreur lors de la validation :', err);
      alert('Erreur lors de la validation');
    }
  });
}

refuserJustification() {
  const token = localStorage.getItem('token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  this.justificationService.traiterJustification(this.justificationId, 'REFUSEE').subscribe({
    next: () => {
      this.justificationDetails!.statut = 'REFUSEE';
      alert('Justification refusée');
      this.router.navigate(['/admin']); 
    },
    error: (err) => {
      console.error('Erreur lors du refus :', err);
      alert('Erreur lors du refus');
    }
  });
}


  goBack() {
    history.back();
  }
}
