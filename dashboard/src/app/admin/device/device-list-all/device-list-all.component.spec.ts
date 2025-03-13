import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListAllComponent } from './device-list-all.component';

describe('DeviceListAllComponent', () => {
  let component: DeviceListAllComponent;
  let fixture: ComponentFixture<DeviceListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
