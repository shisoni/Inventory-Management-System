import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService} from '../_services/message.service';

import { AuthenticationService } from '../_services/authentication.service';

@Component({ templateUrl: 'login.component.html',styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    dataRefresh:any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService:MessageService
    ) 
    {
        this.loginForm= this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
        })
        }

    ngOnInit() {
      
       //console.log(this.messageService.currentMessage.subscribe);
     
       
    
        
    }


    giveErrorMessage()
    {

        this.loading = false;
        this.loginForm.reset();
        this.error = 'User Not Found Or Invalid Credentials';
        
    }

    onSubmit() {

       this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value);
       
    }
}