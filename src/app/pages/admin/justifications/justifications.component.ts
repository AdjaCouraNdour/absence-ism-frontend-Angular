import { Component,inject ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { JustificationModel } from '../../../shared/models/Justification.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
})
export class JustificationComponent implements OnInit {

  private justificationsService: JustificationService = inject(JustificationService);
  justificationsAll: JustificationModel[] = [];
  
  justificationDetails: JustificationModel | null = null;
  absenceId!: string;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {

      this.justificationsService.getAllJustifications()
        .pipe(map(res => res.results))
        .subscribe((data: JustificationModel[]) => {
          this.justificationsAll = data;
        
        });

      this.absenceId = this.route.snapshot.paramMap.get('absenceId')!;
      this.justificationsService.getByAbsenceId(this.absenceId).subscribe(data => {
      this.justificationDetails = data;
    });
    }
}
