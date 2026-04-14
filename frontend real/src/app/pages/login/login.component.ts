import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {}

  submit() {
    const email = this.loginForm.get('email')?.value!;
    const password = this.loginForm.get('password')?.value!;

    this.loginService.login(email, password).subscribe({
      next: () => {
        this.toastService.success("Login realizado com sucesso!");

        setTimeout(() => {
          window.location.href = 'http://localhost:8080/home';
        }, 100);
      },
      error: (err) => {
        console.error("Erro no login:", err);
        this.toastService.error("E-mail ou senha incorretos!");
      }
    });
  }

  navigate() {
    this.router.navigate(["/signup"]);
  }
}
