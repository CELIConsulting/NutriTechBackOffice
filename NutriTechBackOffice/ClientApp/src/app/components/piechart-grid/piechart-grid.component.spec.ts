import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartGridComponent } from './piechart-grid.component';

describe('PiechartGridComponent', () => {
  let component: PiechartGridComponent;
  let fixture: ComponentFixture<PiechartGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
