import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assets } from '../_models/assets';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html',styleUrls: ['./home.component.scss']  })
export class HomeComponent {
    loading = false;
    insertDialog : boolean = false;
    editDialog : boolean = false;
    formAsset : FormGroup;
    editAsset : FormGroup;
    assets: any;
    asset:any;
    flag:boolean = false;
    dataRefresh:any;
    constructor(private userService: UserService,private authenticationService: AuthenticationService,private router:Router,private fb: FormBuilder) { 

        this.formAsset = this.fb.group({
            assetName: ['', Validators.required],
            registrationDate: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loading = true;
        this.callServices(true);
    this.refreshData();
      
    }

    callServices(flag)
    {
        this.userService.getAllAssets().subscribe(assets => this.assets = assets);
    }

    refreshData(){
        this.dataRefresh = setTimeout(() => {
         
          this.callServices(false);
        }, 250); 
      }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    insertAsset() {
        this.insertDialog = true;
      }

      editAssetValues(_id){
        this.userService.getAssetById(_id).subscribe(asset => this.asset = asset);
        this.editAsset = this.fb.group({
          assetName: [this.asset.assetName, Validators.required],
          registrationDate: [this.asset.registrationDate, Validators.required]
      });
        this.editDialog = true;

      }

      hideInsertDialog() {
        this.formAsset.reset();
        this.insertDialog = false;
        
        
      }

      updateAsset(){

      }

      saveAsset(){
       this.userService.saveAsset(this.formAsset.value);
        this.formAsset.reset();
       this.refreshData();
        this.insertDialog = false;
        
      }
}