import { Component, inject, OnInit } from '@angular/core';
import { Observable,map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../shared/services/impl/session.service';
import { SessionComponent } from '../../../components/Sessions/session.component';

@Component({
  selector: 'app-sessions',
  imports: [SessionComponent, CommonModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})

export class SessionsComponent implements OnInit {

  private sessionsService: SessionService = inject(SessionService);
  sessions$: Observable<any> = new Observable();

   ngOnInit(): void {
    this.sessions$ = this.sessionsService.getAllSessions()
      .pipe(
        map(response => response.results)  
      );

    this.sessions$.subscribe(data => console.log('Liste des étudiants:', data));
  }

}
