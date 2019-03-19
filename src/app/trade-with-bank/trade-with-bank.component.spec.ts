import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeWithBankComponent } from './trade-with-bank.component';

describe('TradeWithBankComponent', () => {
  let component: TradeWithBankComponent;
  let fixture: ComponentFixture<TradeWithBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeWithBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeWithBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
