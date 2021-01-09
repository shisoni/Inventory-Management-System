import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { environment } from '../../environments/environment';
import { Assets} from '../_models/assets';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,private authenticationService : AuthenticationService) { }

    saveAsset(asset: Assets) {     
        return this.http.post(`${environment.apiUrl}/api/assets/`,asset).subscribe(data=>{});
    }

    getAllAssets()
    {
        return this.http.get(`${environment.apiUrl}/api/assets/`+this.authenticationService.getAccessToken());
    }
}