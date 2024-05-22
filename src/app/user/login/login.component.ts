import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../state/user/user.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { selectSetPlayerOnLogin, selectUser } from 'src/app/state/user/user.selector';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DialogComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  setPlayerOnLogin?: number;

  constructor(private store: Store, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.select(selectSetPlayerOnLogin)
      .subscribe({
        next: (id) => this.setPlayerOnLogin = Number(id)
      });
    this.subscribeUserLogin();
  }

  private subscribeUserLogin(): void {
    this.store.select(selectUser).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate([{ outlets: { dialog: null } }]);
        }
      }
    });
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const model = this.loginFormGroup.value;
      this.store.dispatch(UserActions.login({ email: model.email!, password: model.password!, setPlayerOnLogin: this.setPlayerOnLogin ?? null }))
    }
  }

  onClose() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

}
