import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient) {}

  getEmployees() {
    this.http
      .get<{ message: string; employees: any }>(
        'http://localhost:3000/api/employees'
      )
      .pipe(
        map(employeeData => {
          return employeeData.employees.map(employee => {
            return {
              name: employee.name,
              content: employee.content,
              id: employee._id
            };
          });
        })
      )
      .subscribe(transformedEmployees => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  getEmployee(id: string) {
    //make explicite
    return this.http.get<any>('http://localhost:3000/api/employees/' + id);
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  addEmployee(name: string, content: string) {
    const employee: Employee = { id: null, name: name, content: content };
    this.http
      .post<{ message: string; employeeId: string }>(
        'http://localhost:3000/api/employees',
        employee
      )
      .subscribe(responseData => {
        const id = responseData.employeeId;
        employee.id = id;
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
      });
  }

  updateEmployee(id: string, name: string, content: string) {
    const employee: Employee = { id: id, name: name, content: content };
    this.http
      .put('http://localhost:3000/api/employees/' + id, employee)
      .subscribe(response => {
        const updatedEmployee = [...this.employees];
        const oldEmployeeIndex = updatedEmployee.findIndex(
          e => e.id === employee.id
        );
        updatedEmployee[oldEmployeeIndex] = employee;
        this.employees = updatedEmployee;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  deleteEmployee(employeeId: string) {
    this.http
      .delete('http://localhost:3000/api/employees/' + employeeId)
      .subscribe(() => {
        const updatedEmployees = this.employees.filter(
          employee => employee.id !== employeeId
        );
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }
}
