import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  betValue: number;
  randomNumber: number;
  place: string;
  balance = 1;
  color: string;

  constructor( private contractSvc: ContractService ) {
  }

  ngOnInit() {
    this.contractSvc.get();
  }

  high() {
    this.random();
    if (this.randomNumber > 5000) {
      this.place = 'Winner';
      this.color = 'green';
    } else {
      this.place = 'Losser';
      this.color = 'red';
    }
  }

  low() {
    this.random();
    if (this.randomNumber < 5000) {
      this.place = 'Winner';
      this.color = 'green';
    } else {
      this.place = 'Losser';
      this.color = 'red';
    }
  }

  random() {
    this.randomNumber = Math.floor(Math.random() * 10000 + 1);
    this.betValue = null;
  }

}
