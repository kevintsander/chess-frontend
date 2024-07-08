import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ToastType } from 'src/app/ui/shared/toast/toast-type.enum';
import { Toast } from 'src/app/ui/shared/toast/toast.model';

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'Pop Toast': (message: string, type: ToastType = ToastType.Info, duration: number = 5000) => ({ toast: new Toast(message, type, duration) }),
    'Eat Toast': (id: string) => ({ id })
  }
});
