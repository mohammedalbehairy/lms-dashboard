import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McsTransactionsComponent } from './mcs-transactions.component';

describe('McsTransactionsComponent', () => {
  let component: McsTransactionsComponent;
  let fixture: ComponentFixture<McsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McsTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
