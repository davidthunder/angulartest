import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap, RouterLink, Router } from '@angular/router';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  employee: Employee;
  private mode = '';
  private employeeId = '';
  public isloaded = false;

  constructor(
    public employeesService: EmployeesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'edit';
        this.employeeId = paramMap.get('employeeId');
        this.isloaded = true;
        this.employeesService
          .getEmployee(this.employeeId)
          .subscribe(employeeData => {
            this.isloaded = false;
            this.employee = {
              id: employeeData._id,
              name: employeeData.name,
              content: employeeData.content
            };
          });
      } else {
        this.mode = 'create';
        this.employeeId = null;
      }
    });
  }

  onSaveEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.employeesService.addEmployee(form.value.name, form.value.content);
    } else {
      this.employeesService.updateEmployee(
        this.employeeId,
        form.value.name,
        form.value.content
      );
    }

    this.router.navigate(['/view']);
    form.resetForm();
  }
}
