import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { EmployeeIndexComponent } from './components/employee-index/employee-index.component';

@Component({
  selector: 'app-root',
  imports: [EmployeeIndexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-crud-app';
}
