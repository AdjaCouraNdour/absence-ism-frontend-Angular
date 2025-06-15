import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/impl/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ism-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorMessage: string = "";
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formLogin = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      motDePasse: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.formLogin.invalid) return;

    this.loading = true;
    const { login, motDePasse } = this.formLogin.value;

    this.authService.Login(login, motDePasse).subscribe({
      next: (response) => {
        const utilisateur = response?.results?.utilisateur;
        const token = response?.results?.token;

        if (utilisateur && token) {
          this.authService.currentUserSignal.set(utilisateur);
          localStorage.setItem('token', token);

          if (utilisateur.role === "ADMIN") {
            this.router.navigateByUrl("/admin");
          } else if (utilisateur.role === "ETUDIANT") {
            this.router.navigateByUrl("/admin");
          } else {
            this.errorMessage = "Accès refusé. Rôle inconnu.";
          }
        } else {
          this.errorMessage = "Login ou mot de passe incorrect.";
        }
      }
    });
  }

  ngOnInit(): void {
    const user = this.authService.currentUserSignal();
    if (user) {
      if (user.role === "ADMIN") {
        this.router.navigateByUrl("/dashboard");
      } else {
        this.router.navigateByUrl("/etudiants/absences");
      }
    }
  }
}
