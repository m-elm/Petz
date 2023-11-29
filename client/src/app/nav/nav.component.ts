import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  routerLink: string = '/';


  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe({
      next: user => {
        this.routerLink = user ? '/members' : '/';
      }
    });

  }


  login(): void {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        this.model = {};
      }
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  MessagesActivated(tabName: string){
    if(tabName === 'Messages' && this.accountService.currentUser$){

    }
  }
}
