import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterStateComponent } from './cash-register-state.component';

describe('CashRegisterStateComponent', () => {
  let component: CashRegisterStateComponent;
  let fixture: ComponentFixture<CashRegisterStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashRegisterStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
