import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from '../../../shared/models/user.model';
import { AuthMockService } from '../../../shared/services/impl/auth-mock.service';

@Component({
  selector: 'ism-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorMessage: string = "";
  loading: boolean = false;
  showPassword: boolean = false; // 👈 ajout ici

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthMockService,
    private router: Router,
  ) {
    this.formLogin = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword; // 👈 méthode utilisée dans le template
  }

  onLogin() {
    if (this.formLogin.invalid) {
      return;
    }

    const { login, password } = this.formLogin.value;
    this.authService.Login(login, password).subscribe({
      next: (response: LoginResponse) => {
        this.loading = true;
        if (response && response.success) {
          if (response.data?.role === "ADMIN") {
            this.router.navigateByUrl("/pointages/absences");
          } else {
            this.loading = false;
            this.errorMessage = "Accès refusé. Seul un administrateur peut se connecter.";
          }
        } else {
          this.errorMessage = response.message || "Login ou mot de passe incorrect.";
        }
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = true;
        this.errorMessage = err.error.message || "Problème Backend !";
      },
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        this.router.navigateByUrl("/etudiants/absences");
        return;
      }
      this.router.navigateByUrl('/etudiants/absences');
    }
  }
}






// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NgIf } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LoginResponse } from '../../../shared/models/user.model';
// import { AuthMockService } from '../../../shared/services/impl/auth-mock.service';

// @Component({
//   selector: 'ism-login',
//   imports: [ReactiveFormsModule, NgIf],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   formLogin: FormGroup;
//   errorMessage: string = "";
//   loading: boolean = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private authService: AuthMockService,
//     private router: Router,

//   ) {
//     this.formLogin = this.formBuilder.group({
//       login: new FormControl('', [Validators.required]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     });
//   }

//   onLogin() {
//     if (this.formLogin.invalid) {
//       return;
//     }

//     const { login, password } = this.formLogin.value;
//     this.authService.Login(login, password).subscribe({
//       next: (response: LoginResponse) => {
//         this.loading = true;
//         if (response && response.success) {
//           if (response.data?.role === "ADMIN") {
//             this.router.navigateByUrl("/pointages/absences");
//           } else {
//             this.loading = false;
//             this.errorMessage = "Accès refusé. Seul un administrateur peut se connecter.";
//           }
//         } else {
//           this.errorMessage = response.message || "Login ou mot de passe incorrect.";
//         }
//       },
//       complete: () => {
//         this.loading = false;
//       },
//       error: (err) => {
//         this.loading = false;
//         this.errorMessage = err.error.message || "Problème côté serveur.";
//       },
//     });
//   }

//   ngOnInit(): void {
//     if (this.authService.isAuthenticated()) {
//       if (this.authService.isAdmin()) {
//         this.router.navigateByUrl("/admin/commandes");
//         return;
//       }
//     }
//   }

//   protected readonly require = require;
// }
