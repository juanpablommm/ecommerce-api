import { Component } from '@angular/core';
import { LoginRequestDto } from '../models/login-request-dto';
import { LoginResponseDto } from '../models/login-response-dto';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequestDto = new LoginRequestDto('', '');

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.loginRequest).subscribe(
      (response: LoginResponseDto) => {
        this.authService.storeTokens(response);

        this.router.navigate(['/home']); 
      },
      error => {
        console.error('User authentication failed', error);
      }
    );
  }
}
