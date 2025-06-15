import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificationSessionsComponent } from './justificationsSessions.component';


describe('JustificationsComponent', () => {
  let component: JustificationSessionsComponent;
  let fixture: ComponentFixture<JustificationSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationSessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
