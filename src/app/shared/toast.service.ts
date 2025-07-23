import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(message: string, type: ToastType = 'success') {
    this.toasts.push({ message, type });
    setTimeout(() => {
      this.toasts.shift();
    }, 3000);
  }

  getToasts() {
    return this.toasts;
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
