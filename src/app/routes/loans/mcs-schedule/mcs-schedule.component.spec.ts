import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McsScheduleComponent } from './mcs-schedule.component';

describe('McsScheduleComponent', () => {
  let component: McsScheduleComponent;
  let fixture: ComponentFixture<McsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McsScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
