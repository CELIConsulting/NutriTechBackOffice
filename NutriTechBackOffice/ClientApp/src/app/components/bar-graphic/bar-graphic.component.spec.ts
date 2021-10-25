import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphicComponent } from './bar-graphic.component';

describe('BarGraphicComponent', () => {
  let component: BarGraphicComponent;
  let fixture: ComponentFixture<BarGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
