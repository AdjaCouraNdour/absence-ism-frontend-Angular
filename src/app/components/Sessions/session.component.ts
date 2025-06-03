import { Component, Input} from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SessionModel } from '../../shared/models/session.model';

@Component({
  selector: 'app-session',
  imports: [CommonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})



export class SessionComponent {

  @Input({
    alias : "session", 
    required: true
  }) session!: SessionModel;

  constructor(private router : Router ) {
  }

  onLoadsessionViewAbsences(sessionId : string){
    this.router.navigateByUrl(`/pointages/${sessionId}/absences`)
  }
  session$:Observable<SessionModel[]> = new Observable();

  protected readonly Array = Array;
 
}

