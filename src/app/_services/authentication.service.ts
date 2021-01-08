import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    

    constructor(private http: HttpClient,public router:Router) {
      
    }

    

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/login`, {username,password })
            .subscribe((user:any) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token',user.token);
                
            
                this.router.navigate(['/']);
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