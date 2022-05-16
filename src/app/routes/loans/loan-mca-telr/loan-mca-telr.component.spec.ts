import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanMcaTelrComponent } from './loan-mca-telr.component';

describe('LoanMcaTelrComponent', () => {
  let component: LoanMcaTelrComponent;
  let fixture: ComponentFixture<LoanMcaTelrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanMcaTelrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanMcaTelrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
