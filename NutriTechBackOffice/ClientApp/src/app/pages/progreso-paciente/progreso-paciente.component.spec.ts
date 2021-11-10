import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoPacienteComponent } from './progreso-paciente.component';

describe('ProgresoPacienteComponent', () => {
  let component: ProgresoPacienteComponent;
  let fixture: ComponentFixture<ProgresoPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresoPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
