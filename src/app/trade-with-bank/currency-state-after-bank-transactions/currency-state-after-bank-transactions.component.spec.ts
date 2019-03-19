import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyStateAfterBankTransactionsComponent } from './currency-state-after-bank-transactions.component';

describe('CurrencyStateAfterBankTransactionsComponent', () => {
  let component: CurrencyStateAfterBankTransactionsComponent;
  let fixture: ComponentFixture<CurrencyStateAfterBankTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyStateAfterBankTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyStateAfterBankTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
