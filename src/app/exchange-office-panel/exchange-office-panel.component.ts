import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExchangeOfficeService } from '../service/exchange-office-service';
import { WorkPlace } from '../model/work-place-model';
import { Transaction } from '../model/transaction-model';

@Component({
  selector: 'app-exchange-office-panel',
  templateUrl: './exchange-office-panel.component.html',
  styleUrls: ['./exchange-office-panel.component.css']
})
export class ExchangeOfficePanelComponent implements OnInit {

  private exchangeOffice : WorkPlace; 

  constructor(private activeRoute : ActivatedRoute,
              private exchangeOfficeService : ExchangeOfficeService) { }

  ngOnInit() {
    
    this.activeRoute.params.subscribe( (params : Params) =>{
      let exchangeOfficeName : string = params['name'];
      this.exchangeOffice = this.exchangeOfficeService.getExchangeOfficeState(exchangeOfficeName);
    });
  }

}
