import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../../../shared/services/impl/etudiant.service';
import { PointageModel } from '../../../../shared/models/pointage.model';
import { EtudiantModel } from '../../../../shared/models/etudiant.model';


@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etudiantAbsences.component.html',
  styleUrl: './etudiantAbsences.component.css'
})
export class EtudiantAbsencesComponent implements OnInit {
  private etudiantsService: EtudiantService = inject(EtudiantService);
   private router = inject(Router);
  private route = inject(ActivatedRoute);

  absencesAll: PointageModel[] = [];
  absencesPerPage: PointageModel[] = [];
  etudiant: EtudiantModel | null = null;
  etudiantId!: string;

  currentPage = 0;
  pageSize = 4;
  pages: number[] = [];

  ngOnInit(): void {
    
    const etudiantId = String(this.route.snapshot.paramMap.get('etudiantId'));

    this.etudiantsService.getById(etudiantId)
     .subscribe({
      next: (data) => {
        if (data?.results) {
          this.etudiant = data.results;
          console.log('Étudiant chargé :', this.etudiant);
        } else {
          console.warn('Aucun étudiant trouvé dans la réponse.');
        }
      }
    });

  
    this.etudiantsService.getListeAbsencesByEtudiantId(etudiantId)
      .subscribe((response: any) => {
        this.absencesAll = response.results;
        console.log("absences récupérés :", this.absencesAll);
        this.setupPagination();
        this.goToPage(0);
      });
  }

  voirDetails(absenceId: string) {
    this.router.navigate(['/admin/justification', absenceId, 'justification']);
  }

  setupPagination() {
    const totalPages = Math.ceil(this.absencesAll.length / this.pageSize);
    this.pages = Array(totalPages).fill(0).map((_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.absencesPerPage = this.absencesAll.slice(start, end);
  }
}
