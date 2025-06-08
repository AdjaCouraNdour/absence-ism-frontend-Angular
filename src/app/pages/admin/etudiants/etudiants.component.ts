// import { Component, inject, OnInit } from '@angular/core';
// import { Observable,map } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { EtudiantComponent } from '../../../components/Etudiants/etudiant.component';
// import { EtudiantService } from '../../../shared/services/impl/etudiant.service';

// @Component({
//   selector: 'app-etudiants',
//   imports: [EtudiantComponent, CommonModule],
//   templateUrl: './etudiants.component.html',
//   styleUrl: './etudiants.component.css'
// })

// export class EtudiantsComponent implements OnInit {

//   private etudiantsService: EtudiantService = inject(EtudiantService);
//   etudiants$: Observable<any> = new Observable();

//    ngOnInit(): void {
//     this.etudiants$ = this.etudiantsService.getAllEtudiants()
//       .pipe(
//         map(response => response.results)  
//       );

//     this.etudiants$.subscribe(data => console.log('Liste des étudiants:', data));
//   }

// }
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EtudiantComponent } from '../../../components/Etudiants/etudiant.component';
import { EtudiantService } from '../../../shared/services/impl/etudiant.service';
import { EtudiantModel } from '../../../shared/models/etudiant.model';

@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [CommonModule, EtudiantComponent],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {
  private etudiantsService: EtudiantService = inject(EtudiantService);
  etudiantsAll: EtudiantModel[] = [];
  etudiantsPerPage: EtudiantModel[] = [];

  currentPage = 0;
  pageSize = 4; // 4 étudiants par page
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
