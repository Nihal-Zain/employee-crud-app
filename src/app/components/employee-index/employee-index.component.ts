// ...existing code...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, PaginatedResponse } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastService } from '../../shared/toast.service';
import { ToastComponent } from '../../shared/toast.component';

@Component({
  selector: 'app-employee-index',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeFormComponent, ToastComponent],
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit {
  showDeleteModal = false;
  deleteTargetId: number | null = null;
  employees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  loading = false;
  showModal = false;
  selectedEmployee: Employee | null = null;
  isEditMode = false;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;

  // Sorting
  sortField: 'name' | 'address' | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Checkbox selection
  checkedRows: { [id: string]: boolean } = {};
  allChecked: boolean = false;

  constructor(private employeeService: EmployeeService, public toastService: ToastService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.totalCount = employees.length;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize) || 1;
        this.setPaginatedEmployees();
        // Initialize checkedRows for all employees if not already set
        for (const emp of employees) {
          const key = emp.id != null ? emp.id.toString() : '';
          if (this.checkedRows[key] === undefined) {
            this.checkedRows[key] = false;
          }
        }
        this.updateAllChecked();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.toastService.show('Error loading employees. Please try again.', 'error');
        this.loading = false;
      }
    });
  }

  setPaginatedEmployees(): void {
    let sorted = [...this.employees];
    if (this.sortField) {
      sorted.sort((a: Employee, b: Employee) => {
        let valA = '', valB = '';
        if (this.sortField === 'name') {
          valA = (a.name || '').toLowerCase();
          valB = (b.name || '').toLowerCase();
        } else if (this.sortField === 'address') {
          valA = (a.address || '').toLowerCase();
          valB = (b.address || '').toLowerCase();
        }
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = sorted.slice(start, end);
    this.updateAllChecked();
  }

  updateAllChecked() {
    // Only consider employees on the current page
    this.allChecked = this.paginatedEmployees.length > 0 && this.paginatedEmployees.every(emp => this.checkedRows[emp.id != null ? emp.id.toString() : '']);
  }

  sortBy(field: 'name' | 'address') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.setPaginatedEmployees();
  }

  toggleAllChecked(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.allChecked = checked;
    for (const emp of this.paginatedEmployees) {
      const key = emp.id != null ? emp.id.toString() : '';
      this.checkedRows[key] = checked;
    }
  }

  openAddModal(): void {
    this.selectedEmployee = null;
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEmployee = null;
  }

  onSave(employee: Employee): void {
    if (this.isEditMode && this.selectedEmployee?.id) {
      this.updateEmployee(this.selectedEmployee.id, employee);
    } else {
      this.createEmployee(employee);
    }
  }

  createEmployee(employee: Employee): void {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeModal();
        this.toastService.show('Employee created successfully!', 'success');
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        this.toastService.show('Error creating employee. Please try again.', 'error');
      }
    });
  }

  updateEmployee(id: number, employee: Employee): void {
    this.employeeService.updateEmployee(id, employee).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeModal();
        this.toastService.show('Employee updated successfully!', 'success');
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        this.toastService.show('Error updating employee. Please try again.', 'error');
      }
    });
  }

  // Show custom delete confirmation modal
  promptDeleteEmployee(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
  }

  confirmDeleteEmployee(): void {
    if (this.deleteTargetId != null) {
      this.employeeService.deleteEmployee(this.deleteTargetId).subscribe({
        next: () => {
          this.loadEmployees();
          this.toastService.show('Employee deleted successfully!', 'success');
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.toastService.show('Error deleting employee. Please try again.', 'error');
          this.closeDeleteModal();
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteTargetId = null;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.setPaginatedEmployees();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}


