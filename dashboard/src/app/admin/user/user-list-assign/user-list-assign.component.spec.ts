import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListAssignComponent } from './user-list-assign.component';

describe('UserListAssignComponent', () => {
  let component: UserListAssignComponent;
  let fixture: ComponentFixture<UserListAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
