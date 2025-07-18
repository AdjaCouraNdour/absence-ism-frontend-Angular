import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SessionService } from '../../../shared/services/impl/session.service';
import { SessionModel } from '../../../shared/models/session.model';
import { SessionComponent } from '../../../components/Sessions/session.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, SessionComponent, FormsModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent implements OnInit {
  private sessionsService: SessionService = inject(SessionService);
  sessionsAll: SessionModel[] = [];
  sessionsPerPage: SessionModel[] = [];
  
  filtre: 'TOUS' | 'Classe 1' | 'Classe 2' | 'Classe 3' = 'TOUS' ;

  currentPage = 0;
  pageSize = 3
  pages: number[] = [];

  ngOnInit(): void {
    this.sessionsService.getSessionsDuJour()
      .pipe(map(res => res.results))
      .subscribe((data: SessionModel[]) => {
        this.sessionsAll = data;
        this.setupPagination();
        this.goToPage(0);
      });
  }


  filtrerEtPaginer() {
  this.currentPage = 0;
  this.sessionsPerPage = this.getFilteredsessions().slice(0, this.pageSize);
  this.setupPagination();
  }

  getFilteredsessions(): SessionModel[] {
    if (this.filtre === 'TOUS') 
      return this.sessionsAll;
    return this.sessionsAll.filter(p => p.classeLibelle === this.filtre);
  }

  setupPagination() {
    const totalPages = Math.ceil(this.getFilteredsessions().length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.sessionsPerPage = this.getFilteredsessions().slice(start, end);
  }

}
