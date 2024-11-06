import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UserCreateDto } from '../models/user-create-dto';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  providers: [UserService],
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createUserForm = this.fb.group({
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [['Cliente'], Validators.required]
    });
  }


  onSubmit() {
    if (this.createUserForm.valid) {
      const userData: UserCreateDto = this.createUserForm.value;
      this.userService.createUser(userData).subscribe(
        response => {
          console.log('Usuario creado con éxito:', response);
        },
        (error: any) => {
          console.error('Error al crear usuario:', error);
        }
      );
    }
  }
}
