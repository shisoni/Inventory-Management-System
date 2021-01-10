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
    assetName:String;
    registrationDate:String;
    assetId:Number;
    constructor(private userService: UserService,private authenticationService: AuthenticationService,private router:Router,private fb: FormBuilder) { 

        this.formAsset = this.fb.group({
            assetName: ['', Validators.required],
            registrationDate: ['', Validators.required]
        });
        this.editAsset = this.fb.group({
          _id:['',Validators.required],
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
         
          this.callServices(true);
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
        console.log("Id:" + _id);
        this.userService.getAssetById(_id).subscribe((data:any) =>{ this.asset = data
          console.log("data => ",data);
        this.assetId = this.asset[0]._id;
         this.assetName = this.asset[0].assetName;
         this.registrationDate = this.asset[0].registrationDate;
         this.editAsset = this.fb.group({
          _id:[this.assetId,Validators.required],
          assetName: [this.assetName, Validators.required],
          registrationDate: [this.registrationDate, Validators.required]
      });
         
      });
      console.log("Asset => ",this.assetName);
      
    
        this.editDialog = true;

      }

      hideInsertDialog() {
        this.formAsset.reset();
        this.insertDialog = false;
      }

      hideEditDialog()
      {
        this.editAsset.reset();
        this.editDialog = false;
      }

      updateAsset(){
        console.log("Printing:"+this.editAsset.get('assetName').value);
        this.userService.updateAsset(this.editAsset.value);
        this.editAsset.reset();
       this.refreshData();
        this.editDialog = false;
      }

      saveAsset(){
       this.userService.saveAsset(this.formAsset.value);
        this.formAsset.reset();
       this.refreshData();
        this.insertDialog = false;
        
      }

      deleteAsset(_id)
      {
        console.log("Id:"+_id);
        this.userService.deleteAsset(_id);
        this.refreshData();
      }
}