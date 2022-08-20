import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M8itsolutionComponent } from './m8itsolution.component';

describe('M8itsolutionComponent', () => {
  let component: M8itsolutionComponent;
  let fixture: ComponentFixture<M8itsolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M8itsolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M8itsolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
