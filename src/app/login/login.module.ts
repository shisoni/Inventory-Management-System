import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule,TabViewModule,ToastModule,ToolbarModule,FileUploadModule,TableModule,DialogModule,ConfirmDialogModule} from 'primeng';



@NgModule({
    imports: [CommonModule,DropdownModule,ReactiveFormsModule, TabViewModule,FormsModule,ConfirmDialogModule,DialogModule,TableModule,ToastModule,ToolbarModule,FileUploadModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
