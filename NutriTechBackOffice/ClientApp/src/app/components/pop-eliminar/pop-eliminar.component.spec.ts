import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopEliminarComponent } from './pop-eliminar.component';

describe('PopEliminarComponent', () => {
  let component: PopEliminarComponent;
  let fixture: ComponentFixture<PopEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
