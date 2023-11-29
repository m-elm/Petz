import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {
  resgisterMode: boolean = true;
  users: any;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  registerToggle(){
    this.resgisterMode = !this.resgisterMode;
  }

  cancelRegisterMode(event : boolean){
    this.resgisterMode = event;
  }

}
