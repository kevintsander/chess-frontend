import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Sign Up': props<{ email: string, password: string }>(),
    'Login': props<{ email: string, password: string }>(),
    'LoginSuccess': props<{ user: User }>(),
    'LoginFailure': props<{ error: string }>(),
    'Logout': emptyProps()
  }
});
