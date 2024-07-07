import { ToastType } from "./toast-type.enum";
export interface IToast {
  id: string,
  message: string,
  type: ToastType,
  duration: number
}

export class Toast implements IToast {
  id: string = crypto.randomUUID();
  message: string = "";
  type: ToastType;
  duration: number;

  constructor(message: string, type: ToastType = ToastType.Info, duration: number = 5000) {
    this.message = message
    this.type = type
    this.duration = duration
  }
}
