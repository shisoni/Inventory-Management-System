import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;

    constructor(private authenticationService: AuthenticationService,private router:Router) { }

    ngOnInit() {
        this.loading = true;
      
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}