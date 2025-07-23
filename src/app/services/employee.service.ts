import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { mapApiEmployeeToEmployee } from '../utils/employee-mapper';
import { mapEmployeeToApiPayload } from '../utils/employee-payload-mapper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://task.soft-zone.net/api';
  
  constructor(private http: HttpClient) { }


  // Get all employees and map API fields to Employee interface
  getEmployees(): Observable<Employee[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Employees/getAllEmployees`).pipe(
      map(apiEmployees => apiEmployees.map(mapApiEmployeeToEmployee))
    );
  }


  // Get employee by ID and map API fields to Employee interface
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<any>(`${this.baseUrl}/Employees/getEmpByID/${id}`).pipe(
      map(mapApiEmployeeToEmployee)
    );
  }


  // Create new employee using correct API endpoint and payload
  createEmployee(employee: Employee): Observable<any> {
    const payload = mapEmployeeToApiPayload(employee);
    return this.http.post<any>(`${this.baseUrl}/Employees/addEmployee`, payload);
  }


  // Update employee using correct API endpoint and payload
  updateEmployee(id: number, employee: Employee): Observable<any> {
    const payload = mapEmployeeToApiPayload({ ...employee, id }, true);
    return this.http.post<any>(`${this.baseUrl}/Employees/editEmployee`, payload);
  }


  // Delete employee using GET endpoint as per backend API
  deleteEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Employees/deleteEmpByID/${id}`);
  }
}