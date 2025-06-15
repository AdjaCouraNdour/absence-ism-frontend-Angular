import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificationAbsencesComponent } from './justificationsAbsences.component';


describe('JustificationsComponent', () => {
  let component: JustificationAbsencesComponent;
  let fixture: ComponentFixture<JustificationAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationAbsencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
