import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { JustificationModel } from '../../../shared/models/Justification.model';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
})
export class JustificationComponent implements OnInit {
  private justificationsService = inject(JustificationService);
  private route = inject(ActivatedRoute);

  justificationDetails: JustificationModel | null = null;
  absenceId!: string;

  ngOnInit(): void {
    this.absenceId = this.route.snapshot.paramMap.get('absenceId')!;
    this.justificationsService.getById(this.absenceId).subscribe({
      next: (data) => {
        this.justificationDetails = data;
        console.log('Justification chargée :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la justification :', err);
      }
    });
  }

  goBack() {
    history.back();
  }

}
