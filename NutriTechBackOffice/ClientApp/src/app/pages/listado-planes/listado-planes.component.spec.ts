import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPlanesComponent } from './listado-planes.component';

describe('ListadoPlanesComponent', () => {
  let component: ListadoPlanesComponent;
  let fixture: ComponentFixture<ListadoPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
