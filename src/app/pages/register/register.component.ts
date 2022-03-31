import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const val = this.validateForm.value;
      this.authService.register(val).subscribe({
        next: () => {
          this.authService.login(val.username, val.password).subscribe({
            next: (token: { refresh: string, access: string }) => {
              localStorage.setItem('token', token.access);
              this.router.navigate(['/']);
            },
            error: (error) => {
              this.errorMessage = "Une erreur est survenue"
            }
          })
        },
        error: (error: HttpErrorResponse) => {
          console.log(typeof error.error);
          console.log(error.error);
          Object.keys(error.error).map((field, index ) => {
            this.errorMessage += error.error[field][0] + "\n";
          })
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['password2'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password2: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
    });
  }
}

/*
        return next.handle(req);

 */
