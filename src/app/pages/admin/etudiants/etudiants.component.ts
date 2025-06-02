import { Component, inject, OnInit } from '@angular/core';
import { Observable,map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from '../../../components/Etudiants/etudiant.component';
import { EtudiantService } from '../../../shared/services/impl/etudiant.service';

@Component({
  selector: 'app-etudiants',
  imports: [EtudiantComponent, CommonModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})

export class EtudiantsComponent implements OnInit {

  private etudiantsService: EtudiantService = inject(EtudiantService);
  etudiants$: Observable<any> = new Observable();

   ngOnInit(): void {
    this.etudiants$ = this.etudiantsService.getEtudiants()
      .pipe(
        map(response => response.results)  // on extrait uniquement le tableau results
      );

    this.etudiants$.subscribe(data => console.log('Liste des étudiants:', data));
  }

}
