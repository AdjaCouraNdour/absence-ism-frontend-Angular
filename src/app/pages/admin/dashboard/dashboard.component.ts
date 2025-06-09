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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

 private absencesService: PointageService = inject(PointageService);
 private justificationsService: JustificationService = inject(JustificationService);

  absencesAll: PointageModel[] = [];
  justificationsAll: JustificationModel[] = [];
  absencesPerPage: PointageModel[] = [];

  
  ngOnInit(): void {
    
    this.absencesService.getAllAbsences()
      .pipe(map(res => res.results))
      .subscribe((data: PointageModel[]) => {
        this.absencesAll = data;
       
      }); 
      
      this.justificationsService.getAllJustifications()
      .pipe(map(res => res.results))
      .subscribe((data: JustificationModel[]) => {
        this.justificationsAll = data;
     
      });

  }


}
