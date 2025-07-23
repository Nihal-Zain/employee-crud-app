import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1055;">
      <div *ngFor="let toast of toastService.toasts; let i = index" class="toast show align-items-center text-white border-0 mb-2"
        [ngClass]="toast.type === 'success' ? 'bg-success' : 'bg-danger'" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" (click)="toastService.remove(i)"></button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
