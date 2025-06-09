// import { Component, inject, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { SessionService } from '../../../../shared/services/impl/session.service';
// import { PointageModel } from '../../../../shared/models/pointage.model';

// @Component({
//   selector: 'app-session-details',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './sessions.component.html',
//   styleUrl: './sessions.component.css'
// })
// export class SessionsComponent implements OnInit {

//   private sessionService:SessionService = inject(SessionService);

//   pointages$: Observable<any> = new Observable();
//   detailspointages?: PointageModel;

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     const sessionId = this.route.snapshot.paramMap.get('id');
//     this.pointages$ = this.sessionService.getListeAbsences(Number(sessionId));

//     this.pointages$.subscribe(data => {
//       console.log("absence récupéré :", data);
//       this.detailspointages = data;
//       console.log("Détails de l'pointages :", this.detailspointages);
    
//     });
//   }
// }









import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../../../shared/services/impl/session.service';
import { PointageModel } from '../../../../shared/models/pointage.model';

@Component({
  selector: 'app-session-details',
  templateUrl: './sessions.component.html',// ✅ correction ici
})
export class SessionsComponent implements OnInit {

  private sessionService = inject(SessionService);
  private route = inject(ActivatedRoute);

  pointages: PointageModel[] = [];

  ngOnInit(): void {
    const sessionId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.sessionService.getListeAbsences(sessionId)
      .subscribe((data: PointageModel[]) => {
        this.pointages = data;
        console.log("Pointages récupérés :", this.pointages);
      });
  }
}
