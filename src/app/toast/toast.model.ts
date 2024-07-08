import { ToastType } from "./toast-type.enum";

export class Toast {
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
