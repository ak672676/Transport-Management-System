import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CityListComponent } from "./cities/city-list/city-list.component";
import { CityCreateComponent } from "./cities/city-create/city-create.component";
import { ManagerCreateComponent } from "./managers/manager-create/manager-create.component";
import { ManagerListComponent } from "./managers/manager-list/manager-list.component";
import { ManagerLoginComponent } from "./managers/manager-login/manager-login.component";
import { TruckCreateComponent } from "./truck/truck-create/truck-create.component";
import { DriverListComponent } from "./drivers/driver-list/driver-list.component";
import { DriverCreateComponent } from "./drivers/driver-create/driver-create.component";
import { CustomerCreateComponent } from "./customers/customer-create/customer-create.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";
import { CustomerSearchListComponent } from "./customers/customer-search/customer-search-list.component";
import { BillCreateComponent } from "./bills/bill-create/bill-create.component";
import { BillListComponent } from "./bills/bill-list/bill-list.component";
import { TruckListComponent } from "./truck/truck-list/truck-list.component";
import { CityBillListComponent } from "./cities/city-bills-list/city-bills-list.component";
import { BillUpdateComponent } from "./bills/bill-update/bill-update.component";
import { AuthGuard } from "./managers/auth.guard";
import { BillStatusComponent } from "./bills/bill-status/bill-status.component";

const routes: Routes = [
  { path: "city", component: CityListComponent, canActivate: [AuthGuard] },
  {
    path: "city/create",
    component: CityCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "city/edit/:cityId",
    component: CityCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manager",
    component: ManagerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manager/create",
    component: ManagerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manager/edit/:managerId",
    component: ManagerCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "driver", component: DriverListComponent, canActivate: [AuthGuard] },
  {
    path: "driver/create",
    component: DriverCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "driver/edit/:driverId",
    component: DriverCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: ManagerLoginComponent },
  {
    path: "customer/create",
    component: CustomerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customer/edit/:customerId",
    component: CustomerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customer",
    component: CustomerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customer/search",
    component: CustomerSearchListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bill/create",
    component: BillCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "bill", component: BillListComponent, canActivate: [AuthGuard] },
  {
    path: "truck/create",
    component: TruckCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: "truck", component: TruckListComponent, canActivate: [AuthGuard] },
  {
    path: "truck/edit/:truckId",
    component: TruckCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "city/billlist",
    component: CityBillListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bill/update/:billId",
    component: BillUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bill/status",
    component: BillStatusComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
