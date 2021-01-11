import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { MessageService} from './message.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
   
   

    constructor(private http: HttpClient,public router:Router,private messageService:MessageService) {
      
    }

    
    
    login(userInfo:User) {

        //let param = new HttpParams().set('username',userInfo.username).set('password',userInfo.password);

          
        return this.http.post(`${environment.apiUrl}/api/login`,userInfo)
            .subscribe((user:any) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.status == 'Authenticated')
                {
                    localStorage.setItem('access_token',user.token);
                     this.router.navigate(['/home']);
                }
                else
                {
                   this.messageService.changeMessage("Login Failed");

                    this.router.navigate(['/login']);
                }
               
            });
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
        }

    logout() {
        if (localStorage.removeItem('access_token') == null) {
            this.router.navigate(['/login']);
            }
       
    }

    isLoggedIn(): boolean {
        let authToken = this.getAccessToken();
        return (authToken !== null) ? true : false;
        }
}