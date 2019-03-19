import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBankTransactionComponent } from './new-bank-transaction.component';

describe('NewBankTransactionComponent', () => {
  let component: NewBankTransactionComponent;
  let fixture: ComponentFixture<NewBankTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBankTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBankTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
