import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup<any>;

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit(form: FormGroup<any>) {
    throw new Error('Method not implemented.');
  }

}
