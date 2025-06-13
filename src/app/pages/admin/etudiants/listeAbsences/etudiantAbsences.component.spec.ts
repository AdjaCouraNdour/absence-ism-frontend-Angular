import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtudiantAbsencesComponent } from './etudiantAbsences.component';


describe('EtudiantComponent', () => {
  let component: EtudiantAbsencesComponent;
  let fixture: ComponentFixture<EtudiantAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantAbsencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

