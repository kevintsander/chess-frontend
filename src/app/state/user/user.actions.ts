import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from './user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // log in
    'Login': props<{ email: string, password: string, setPlayerOnLogin: number | null }>(),
    'Login Success': props<{ user: User, setPlayerOnLogin: number | null }>(),
    'Login Failure': props<{ error: string }>(),

    // sign up
    'Sign Up': props<{ email: string, nickname: string, password: string }>(),
    'Sign Up Success': props<{ user: User }>(),
    'Sign Up Failure': props<{ error: string }>(),

    'Set Current User': props<{ user: User | null }>(),
    'Logout': emptyProps(),
  }
});
