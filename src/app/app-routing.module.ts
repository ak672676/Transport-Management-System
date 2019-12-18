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

const routes: Routes = [
  { path: "city", component: CityListComponent },
  { path: "city/create", component: CityCreateComponent },
  { path: "city/edit/:cityId", component: CityCreateComponent },
  { path: "manager", component: ManagerListComponent },
  { path: "manager/create", component: ManagerCreateComponent },
  { path: "manager/edit/:managerId", component: ManagerCreateComponent },
  { path: "driver", component: DriverListComponent },
  { path: "driver/create", component: DriverCreateComponent },
  { path: "driver/edit/:driverId", component: DriverCreateComponent },
  { path: "login", component: ManagerLoginComponent },
  { path: "customer/create", component: CustomerCreateComponent },
  { path: "customer/edit/:customerId", component: CustomerCreateComponent },
  { path: "customer", component: CustomerListComponent },
  { path: "customer/search", component: CustomerSearchListComponent },
  { path: "bill/create", component: BillCreateComponent },
  { path: "bill", component: BillListComponent },
  { path: "truck/create", component: TruckCreateComponent },
  { path: "truck", component: TruckListComponent },
  { path: "truck/edit/:truckId", component: TruckCreateComponent },
  { path: "city/billlist", component: CityBillListComponent },
  { path: "bill/update/:billId", component: BillUpdateComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
