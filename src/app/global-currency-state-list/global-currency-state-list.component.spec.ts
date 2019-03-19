import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCurrencyStateListComponent } from './global-currency-state-list.component';

describe('GlobalCurrencyStateListComponent', () => {
  let component: GlobalCurrencyStateListComponent;
  let fixture: ComponentFixture<GlobalCurrencyStateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCurrencyStateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCurrencyStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
