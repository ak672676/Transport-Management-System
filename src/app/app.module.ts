import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule
} from "@angular/material";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CityCreateComponent } from "./cities/city-create/city-create.component";
import { CityListComponent } from "./cities/city-list/city-list.component";
import { ManagerCreateComponent } from "./managers/manager-create/manager-create.component";
import { ManagerListComponent } from "./managers/manager-list/manager-list.component";
import { DriverCreateComponent } from "./drivers/driver-create/driver-create.component";
import { TruckCreateComponent } from "./truck/truck-create/truck-create.component";
import { AdminLoginComponent } from "./login/admin-login/admin-login.component";
import { ManagerLoginComponent } from "./managers/manager-login/manager-login.component";
import { DriverListComponent } from "./drivers/driver-list/driver-list.component";
import { CustomerCreateComponent } from "./customers/customer-create/customer-create.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";
import { CustomerSearchListComponent } from "./customers/customer-search/customer-search-list.component";
import { BillCreateComponent } from "./bills/bill-create/bill-create.component";
import { BillListComponent } from "./bills/bill-list/bill-list.component";
import { TruckListComponent } from "./truck/truck-list/truck-list.component";
import { CityBillListComponent } from "./cities/city-bills-list/city-bills-list.component";
import { BillUpdateComponent } from "./bills/bill-update/bill-update.component";
//import { SideBarComponent } from "./sidebar/sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CityCreateComponent,
    CityListComponent,
    ManagerCreateComponent,
    ManagerListComponent,
    DriverCreateComponent,
    DriverListComponent,
    TruckCreateComponent,
    TruckListComponent,
    AdminLoginComponent,
    ManagerLoginComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerSearchListComponent,
    BillCreateComponent,
    BillListComponent,
    CityBillListComponent,
    BillUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
