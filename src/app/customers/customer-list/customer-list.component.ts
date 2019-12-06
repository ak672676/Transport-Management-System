import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Customer } from "../customer.model";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  isLoading = false;
  private customersSub: Subscription;

  constructor(public customersService: CustomersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.customersService.getCustomers();
    this.customersSub = this.customersService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.isLoading = false;
        this.customers = customers;
      });
  }
  onDelete(customerId: string) {
    this.customersService.deleteCustomer(customerId);
  }
  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }
}
