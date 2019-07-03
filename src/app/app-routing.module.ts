import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './employees/empoyee-list/employee-list.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'view', component: EmployeeListComponent },
  { path: 'create', component: EmployeeCreateComponent },
  { path: 'edit/:employeeId', component: EmployeeCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
