import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McsDetailsComponent } from './mcs-details.component';

describe('McsDetailsComponent', () => {
  let component: McsDetailsComponent;
  let fixture: ComponentFixture<McsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
