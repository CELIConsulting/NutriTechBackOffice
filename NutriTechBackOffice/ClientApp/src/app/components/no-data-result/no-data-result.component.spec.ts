import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataResultComponent } from './no-data-result.component';

describe('NoDataResultComponent', () => {
  let component: NoDataResultComponent;
  let fixture: ComponentFixture<NoDataResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
