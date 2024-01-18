import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Sign Up': props<{ email: string, password: string }>(),
    'Login': props<{ email: string, password: string, setPlayerOnLogin: number | null }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Set Current User': props<{ user: User | null }>(),
    'Logout': emptyProps()
  }
});
