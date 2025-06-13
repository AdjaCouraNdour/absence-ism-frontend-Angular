import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PointageModel } from '../../../../shared/models/pointage.model';
import { PointageService } from '../../../../shared/services/impl/pointage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JustificationModel } from '../../../../shared/models/Justification.model';


@Component({
  selector: 'app-session-details',
  templateUrl: './sessionDetails.component.html',
  imports: [FormsModule,CommonModule],
})
export class SessionDetailsComponent implements OnInit {

  private pointageService = inject(PointageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  pointagesAll: PointageModel[] = [];

  filtre: 'TOUS' | 'ABSENCE' | 'RETARD' | 'PRESENT' = 'TOUS';

  pointagesFiltresParPage: PointageModel[] = [];
  currentPage = 0;
  pageSize = 5;
  pages: number[] = [];

  ngOnInit(): void {
    const sessionId = String(this.route.snapshot.paramMap.get('sessionId'));
    this.pointageService.getAllPointagesDuneSessionDuJour(sessionId)
      .subscribe((response: any) => {
        this.pointagesAll = response.results;
        console.log("Pointages récupérés :", this.pointagesAll);
        this.setupPagination();
        this.goToPage(0);
      });


  }

  voirDetails(absenceId: string) {
    this.router.navigate(['/admin/justification', absenceId, 'justification']);
  }

  filtrerEtPaginer() {
  this.currentPage = 0;
  this.pointagesFiltresParPage = this.getFilteredPointages().slice(0, this.pageSize);
  this.setupPagination();
}

  getFilteredPointages(): PointageModel[] {
    if (this.filtre === 'TOUS') 
      return this.pointagesAll;
    return this.pointagesAll.filter(p => p.type === this.filtre);
  }

  setupPagination() {
    const totalPages = Math.ceil(this.getFilteredPointages().length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.pointagesFiltresParPage = this.getFilteredPointages().slice(start, end);
  }

}
