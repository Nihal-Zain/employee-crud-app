import { Employee } from '../models/employee.model';

export function mapApiEmployeeToEmployee(apiEmp: any): Employee {
  return {
    id: apiEmp.empId,
    name: apiEmp.empName,
    email: apiEmp.empEmail,
    address: apiEmp.empAddress,
    mobile: apiEmp.empPhone
  };
}
