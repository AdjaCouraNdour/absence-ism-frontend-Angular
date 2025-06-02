import { Component, Input} from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AbsenceModel } from '../../shared/models/absence.model';

@Component({
  selector: 'app-absence',
  imports: [],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css'
})


export class AbsenceComponent {

  @Input({
    alias : "absence", 
    required: true
  }) absence!: AbsenceModel;

  constructor(private router : Router ) {
  }

  onLoadViewJustifications(name : string){
    this.router.navigateByUrl(`/Justification/${name}`)
  }
  absence$:Observable<AbsenceModel[]> = new Observable();

  protected readonly Array = Array;

}

