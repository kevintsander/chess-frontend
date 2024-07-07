import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Toast } from 'src/app/toast/toast.model';

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'Pop Toast': props<{ toast: Toast }>(),
    'Eat Toast': props<{ id: string }>()
  }
});
