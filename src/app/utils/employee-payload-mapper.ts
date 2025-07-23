import { Employee } from '../models/employee.model';

export function mapEmployeeToApiPayload(employee: Employee, includeId: boolean = false): any {
  const payload: any = {
    empName: employee.name,
    empEmail: employee.email,
    empAddress: employee.address,
    empPhone: employee.mobile
  };
  if (includeId && employee.id !== undefined) {
    payload.empId = employee.id;
  }
  return payload;
}
