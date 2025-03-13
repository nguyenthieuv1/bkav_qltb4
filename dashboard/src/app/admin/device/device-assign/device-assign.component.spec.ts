import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAssignComponent } from './device-assign.component';

describe('DeviceAssignComponent', () => {
  let component: DeviceAssignComponent;
  let fixture: ComponentFixture<DeviceAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
