import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { AssumingCashStateService } from '../service/assuming-cash-state-service';
import { Subscription } from 'rxjs/Subscription';
import { CashRegisterState } from '../model/cash-register-state-model';

@Component({
  selector: 'app-global-currency-state-list',
  templateUrl: './global-currency-state-list.component.html',
  styleUrls: ['./global-currency-state-list.component.css']
})

@Injectable()
export class GlobalCurrencyStateListComponent implements OnInit,OnDestroy {

  private cashRegisterSubscription : Subscription;
  private globalCurrencyStateList : Array<CashRegisterState>;

  constructor(private assumingCashStateService : AssumingCashStateService) { 
    this.globalCurrencyStateList = this.assumingCashStateService.getGlobalCurrencyStateList();
  }

  ngOnInit() {

    this.cashRegisterSubscription = this.assumingCashStateService.globalCashRegisterChanged.subscribe( 
      (cashRegisterStateList : CashRegisterState []) => {
        this.globalCurrencyStateList = cashRegisterStateList;
      })
  }

  ngOnDestroy(){
    this.cashRegisterSubscription.unsubscribe();
  }

}
