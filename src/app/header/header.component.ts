import { Component, OnInit } from '@angular/core';
import { UserState } from '../user/state/user.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectUser } from '../user/state/user.selector';
import { User } from '../user/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userStore: Store<UserState>) { }

  ngOnInit(): void {
    this.user$ = this.userStore.select(selectUser);
  }
}
