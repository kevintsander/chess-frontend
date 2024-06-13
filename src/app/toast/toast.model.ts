import { ToastType } from "./toast-type.enum";

export interface IToast {
  message: string,
  type: ToastType
}
