import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  signupForm = new FormGroup<SignupForm>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    passwordConfirm: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {}

  submit() {
    const email = this.signupForm.get('email')?.value!;
    const password = this.signupForm.get('password')?.value!;
    const passwordConfirm = this.signupForm.get('passwordConfirm')?.value!;

    if (password !== passwordConfirm) {
      this.toastService.error("As senhas não coincidem!");
      return;
    }

    this.loginService.signup(email, password).subscribe({
      next: () => {
        this.toastService.success("Cadastro realizado com sucesso!");
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        console.error("Erro na API:", err);
        this.toastService.error(err.error?.message || "Erro inesperado! Tente novamente mais tarde");
      }
    });
  }

  navigate() {
    this.router.navigate(["/login"]);
  }
}
