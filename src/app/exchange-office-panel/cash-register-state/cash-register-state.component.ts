import { Component, OnInit, Input } from '@angular/core';
import { CashRegisterState } from '../../model/cash-register-state-model';

@Component({
  selector: 'app-cash-register-state',
  templateUrl: './cash-register-state.component.html',
  styleUrls: ['./cash-register-state.component.css']
})
export class CashRegisterStateComponent implements OnInit {

@Input() cashRegisterStateList : CashRegisterState;

  constructor() { 

  }

  ngOnInit() {
  }

}
