import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOfficePanelComponent } from './exchange-office-panel.component';

describe('ExchangeOfficePanelComponent', () => {
  let component: ExchangeOfficePanelComponent;
  let fixture: ComponentFixture<ExchangeOfficePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeOfficePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeOfficePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
