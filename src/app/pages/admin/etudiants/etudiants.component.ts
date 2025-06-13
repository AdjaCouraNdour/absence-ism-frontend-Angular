import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { EtudiantService } from '../../../shared/services/impl/etudiant.service';
import { EtudiantModel } from '../../../shared/models/etudiant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {
  private etudiantsService: EtudiantService = inject(EtudiantService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
 
  filtre: 'TOUS' | 'Classe 1' | 'Classe 2' | 'Classe 3' = 'TOUS' ;

  etudiantsAll: EtudiantModel[] = [];
  etudiantsPerPage: EtudiantModel[] = [];

  currentPage = 0;
  pageSize = 4;
  pages: number[] = [];

  ngOnInit(): void {
    this.etudiantsService.getAllEtudiants()
      .pipe(map(res => res.results))
      .subscribe((data: EtudiantModel[]) => {
        this.etudiantsAll = data;
        this.setupPagination();
        this.goToPage(0);
      });
  }

   voirDetails(etudiantId: string) {
    this.router.navigate(['/admin/etudiant', etudiantId]);
  }

  filtrerEtPaginer() {
  this.currentPage = 0;
  this.etudiantsPerPage = this.getFilteredEtudiants().slice(0, this.pageSize);
  this.setupPagination();
}

  getFilteredEtudiants(): EtudiantModel[] {
    if (this.filtre === 'TOUS') 
      return this.etudiantsAll;
    return this.etudiantsAll.filter(e => e.classeLibelle === this.filtre);
  }

  setupPagination() {
    const totalPages = Math.ceil(this.etudiantsAll.length / this.pageSize);
    this.pages = Array(totalPages).fill(0).map((_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.etudiantsPerPage = this.etudiantsAll.slice(start, end);
  }
}
