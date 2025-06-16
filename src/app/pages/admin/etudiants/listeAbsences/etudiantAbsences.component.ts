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
  private etudiantsService = inject(EtudiantService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  absencesAll: PointageModel[] = [];
  absencesPerPage: PointageModel[] = [];
  etudiant: EtudiantModel | null = null;
  etudiantId!: string;

  currentPage = 0;
  pageSize = 4;
  pages: number[] = [];

  loading = true;
  loaded = { etudiant: false, absences: false };

  ngOnInit(): void {
    this.etudiantId = String(this.route.snapshot.paramMap.get('etudiantId'));

    this.chargerEtudiant(this.etudiantId);
    this.chargerAbsences(this.etudiantId);
  }

  private chargerEtudiant(id: string) {
    this.etudiantsService.getById(id).subscribe({
      next: (data) => {
        this.etudiant = data?.results;
        console.log('Étudiant chargé :', this.etudiant);
        this.loaded.etudiant = true;
        this.checkLoading();
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'étudiant :", err);
        this.loaded.etudiant = true;
        this.checkLoading();
      }
    });
  }

  private chargerAbsences(id: string) {
    this.etudiantsService.getListeAbsencesByEtudiantId(id).subscribe({
      next: (response) => {
        this.absencesAll = response.results ;
        console.log("Absences récupérées :", this.absencesAll);
        this.setupPagination();
        this.goToPage(0);
        this.loaded.absences = true;
        this.checkLoading();
      },
      error: (err) => {
        console.error("Erreur lors du chargement des absences :", err);
        this.loaded.absences = true;
        this.checkLoading();
      }
    });
  }

  private checkLoading() {
    if (this.loaded.etudiant && this.loaded.absences) {
      this.loading = false;
    }
  }

  voirDetails(absenceId: string) {
    this.router.navigate(['/admin/etudiant', this.etudiantId, 'absence', absenceId, 'justification']);
  }

  setupPagination() {
    const totalPages = Math.ceil(this.absencesAll.length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.absencesPerPage = this.absencesAll.slice(start, end);
  }
}
