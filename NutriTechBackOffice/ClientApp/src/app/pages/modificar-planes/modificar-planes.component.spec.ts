import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPlanesComponent } from './modificar-planes.component';

describe('ModificarPlanesComponent', () => {
  let component: ModificarPlanesComponent;
  let fixture: ComponentFixture<ModificarPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
