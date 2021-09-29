import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuariosComponent } from './modificar-usuarios.component';

describe('ModificarUsuariosComponent', () => {
  let component: ModificarUsuariosComponent;
  let fixture: ComponentFixture<ModificarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
