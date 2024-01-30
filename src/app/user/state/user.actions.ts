import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // log in
    'Show Login': props<{ setPlayerOnLogin: number | null }>(),
    'Hide Login': emptyProps(),
    'Login': props<{ email: string, password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),

    // sign up
    'Show Sign Up': emptyProps(),
    'Hide Sign Up': emptyProps(),
    'Sign Up': props<{ email: string, nickname: string, password: string }>(),
    'Sign Up Success': props<{ user: User }>(),
    'Sign Up Failure': props<{ error: string }>(),

    'Set Current User': props<{ user: User | null }>(),
    'Logout': emptyProps(),
  }
});
