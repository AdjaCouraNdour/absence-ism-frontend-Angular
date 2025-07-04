import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtudiantComponent } from './etudiant.component';


describe('EtudiantComponent', () => {
  let component: EtudiantComponent;
  let fixture: ComponentFixture<EtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
