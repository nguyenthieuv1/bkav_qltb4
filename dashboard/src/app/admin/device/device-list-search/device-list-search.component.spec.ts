import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListSearchComponent } from './device-list-search.component';

describe('DeviceListSearchComponent', () => {
  let component: DeviceListSearchComponent;
  let fixture: ComponentFixture<DeviceListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
