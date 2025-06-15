import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { JustificationModel } from '../../../shared/models/Justification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
  imports:[CommonModule]
})
export class JustificationComponent implements OnInit {
  private justificationsService = inject(JustificationService);
  private route = inject(ActivatedRoute);

  justificationDetails: JustificationModel | null = null;
  justificationId!: string;
  absenceId!: string;

  ngOnInit(): void {
    this.justificationId = this.route.snapshot.paramMap.get('justificationId')!;
    this.justificationsService.getById(this.justificationId).subscribe({
      next: (data) => {
        this.justificationDetails = data;
        console.log('Justification chargée :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la justification :', err);
      }
    });

    this.absenceId = this.route.snapshot.paramMap.get('absenceId')!;
    this.justificationsService.getByAbsenceId(this.absenceId).subscribe({
      next: (data) => {
        this.justificationDetails = data;
        console.log('Justification chargée :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la justification :', err);
      }
    });

  }

  validerJustification() {
    this.justificationsService.traiterJustification(this.justificationId, 'VALIDEE').subscribe({
      next: () => {
        this.justificationDetails!.statut = 'VALIDEE';
        alert('Justification validée');
      },
      error: () => alert('Erreur lors de la validation')
    });
  }

  refuserJustification() {
    this.justificationsService.traiterJustification(this.justificationId, 'REFUSEE').subscribe({
      next: () => {
        this.justificationDetails!.statut = 'REFUSEE';
        alert('Justification refusée');
      },
      error: () => alert('Erreur lors du refus')
    });
  }


  goBack() {
    history.back();
  }

}
