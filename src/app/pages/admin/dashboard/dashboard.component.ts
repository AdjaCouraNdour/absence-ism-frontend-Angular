import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointageService } from '../../../shared/services/impl/pointage.service';
import { PointageModel } from '../../../shared/models/pointage.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { JustificationModel } from '../../../shared/models/Justification.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {

 private absencesService: PointageService = inject(PointageService);
 private justificationsService: JustificationService = inject(JustificationService);
 private router = inject(Router);

  absencesAll: PointageModel[] = [];
  justificationsAll: JustificationModel[] = [];
  justification : JustificationModel | null = null;
  etudiantId: string | null = null;
  sessionId: string | null = null;
  ngOnInit(): void {
    
    this.absencesService.getAllPointages()
      .pipe(map(res => res.results))
      .subscribe((data: PointageModel[]) => {
        this.absencesAll = data;
      }
    ); 
      
    this.justificationsService.getAllJustifications()
      .pipe(map(res => res.results))
      .subscribe((data: JustificationModel[]) => {
        this.justificationsAll = data;
      }
    );
  }

  // get totalPresences(): number {
  //   return this.absencesAll.filter(absencesAll => absencesAll. === 'PRESENT').length;
  // }
  voirDetails(justificationId: string) {
    this.router.navigate(['/admin/justification', justificationId]);
  } 

}
