import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí
import { UserCreateComponent } from './user-create/user-create.component'; // Asegúrate de que el componente esté importado
import { UserService } from './user.service.spec';

@NgModule({
  declarations: [
    UserCreateComponent, 
    UserService// Declara tu componente aquí
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Asegúrate de que ReactiveFormsModule esté en imports
  ],
  exports:[UserCreateComponent, UserService]
})
export class UserModule { }
