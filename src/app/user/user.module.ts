import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { UserCreateComponent } from './user-create/user-create.component';
import { UserService } from './user.service.spec';

@NgModule({
  declarations: [
    UserCreateComponent, 
    UserService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[UserCreateComponent, UserService]
})
export class UserModule { }
