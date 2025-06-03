// import { Component, inject, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-session-details',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './session-details.component.html',
//   styleUrl: './session-details.component.css'
// })
// export class PageDetailsComponent implements OnInit {

//   private catalogueService: CatalogueService = inject(CatalogueService);

//   pointages$: Observable<any> = new Observable();
//   detailspointages?: pointagesCatalogueModel;
//   quantite: number = 0;
//   panier: any[] = [];
//   errorMessage: string = "";
//   disabledButton: boolean = true;

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     const pointagesId = this.route.snapshot.paramMap.get('id');
//     this.pointages$ = this.catalogueService.getPointagesDetails(Number(pointagesId));

//     this.pointages$.subscribe(data => {
//       console.log("pointages récupéré :", data);
//       this.detailspointages = data;
//       console.log("Détails de l'pointages :", this.detailspointages);
    
//     });
//   }




// }
