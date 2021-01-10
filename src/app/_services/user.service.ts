import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { environment } from '../../environments/environment';
import { Assets} from '../_models/assets';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,private authenticationService : AuthenticationService) { }

    saveAsset(asset: Assets) {     
        return this.http.post(`${environment.apiUrl}/api/assets/`,asset).subscribe(data=>{});
    }

    updateAsset(asset: Assets) {     
        return this.http.put(`${environment.apiUrl}/api/assets/`,asset).subscribe(data=>{});
    }

    deleteAsset(id)
    {
        let header = new HttpHeaders().set(
            "authorization",
             this.authenticationService.getAccessToken()
          );

        return this.http.delete(`${environment.apiUrl}/api/assets/`+id).subscribe(data=>{});
    }

    getAllAssets()
    {
        let header = new HttpHeaders().set(
            "authorization",
             this.authenticationService.getAccessToken()
          );
        return this.http.get(`${environment.apiUrl}/api/assets/`,{headers:header});
    }

    getAssetById(id){
        let header = new HttpHeaders().set(
            "authorization",
             this.authenticationService.getAccessToken()
          );
        return this.http.get(`${environment.apiUrl}/api/assets/`+id,{headers:header});
    }
}