import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/user/user.state';
import { UserActions } from '../../state/user/user.actions';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    DialogComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpFormGroup!: FormGroup<any>;

  constructor(private userStore: Store<UserState>, private router: Router) { }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      email: new FormControl(),
      nickname: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.userStore.dispatch(UserActions.signUp({ ...this.signUpFormGroup.value }))
    this.onClose();
  }

  onClose() {
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
