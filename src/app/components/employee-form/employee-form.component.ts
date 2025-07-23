import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Input() employee: Employee | null = null;
  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Employee>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.createForm();
  }

  ngOnInit(): void {
    this.employeeForm = this.createForm();
  }

  ngOnChanges(): void {
    if (this.employee && this.isEditMode) {
      this.employeeForm.patchValue(this.employee);
    } else if (!this.isEditMode) {
      this.employeeForm.reset();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]],
      address: ['', [Validators.required]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}