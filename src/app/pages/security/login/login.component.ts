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
      console.log("Réponse API :", response); // 👈 Voir la réponse dans la console

      const utilisateur = response?.results?.utilisateurConnect;
      const token = response?.results?.token;

      if (utilisateur && token) {
        this.authService.currentUserSignal.set(utilisateur);
        localStorage.setItem('token', token);

        if (utilisateur.role === "ADMIN") {
          this.router.navigateByUrl("/admin");
        } else {
          this.errorMessage = "Accès refusé. Rôle inconnu.";
        }
      } else {
        this.errorMessage = "Login ou mot de passe incorrect.";
      }

      this.loading = false;
    },

    error: (err) => {
      console.error("Erreur lors du login :", err); // 👈 Affiche l’erreur dans la console
      this.errorMessage = "Erreur lors de la tentative de connexion.";
      this.loading = false;
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
