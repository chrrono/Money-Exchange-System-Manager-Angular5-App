import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransactionListComponent } from './bank-transaction-list.component';

describe('BankTransactionListComponent', () => {
  let component: BankTransactionListComponent;
  let fixture: ComponentFixture<BankTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
