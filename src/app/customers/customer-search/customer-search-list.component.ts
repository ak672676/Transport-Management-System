import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Customer } from "../customer.model";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-customer-search-list",
  templateUrl: "./customer-search-list.component.html",
  styleUrls: ["./customer-search-list.component.css"]
})
export class CustomerSearchListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  isLoading = false;
  private customersSub: Subscription;
  public searchingPhone: string;
  constructor(public customersService: CustomersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.customersService.getCustomers();
    this.customersSub = this.customersService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.isLoading = false;
        this.customers = customers;
        //console.log("********************");
        //console.log(this.customers);
        console.log(this.customers.length);
      });
    this.customersService.test.subscribe((n: number) => {
      console.log("From=>" + n);
    });
  }
  onDelete(customerId: string) {
    this.customersService.deleteCustomer(customerId);
  }

  onCustomerSelect(customerSelected: Customer) {
    //console.log("--->", customerId);
    this.customersService.selectedCustomer = customerSelected;
    // this.customersService.getCustomer(customerId).subscribe(customerData => {
    //   //this.isLoading = false;
    //   this.customersService.selectedCustomer = {
    //     id: customerData._id,
    //     customerId: customerData.customerId,
    //     customerName: customerData.customerName,
    //     street: customerData.street,
    //     city: customerData.city,
    //     state: customerData.state,
    //     country: customerData.country,
    //     pin: customerData.pin,
    //     phone: customerData.phone,
    //     email: customerData.email,
    //     gstNo: customerData.gstNo
    //   };
    // });
  }

  onSearch(phone: string) {
    if (phone === "") {
      //this.searchingPhone = phone;
      this.customersService.getCustomers();
      this.customersSub = this.customersService
        .getCustomerUpdateListener()
        .subscribe((customers: Customer[]) => {
          this.isLoading = false;
          this.customers = customers;
          //console.log("********************");
          //console.log(this.customers);
          console.log(this.customers.length);
        });
    }
    this.searchingPhone = phone;
    this.customersService.getSearchCustomers(this.searchingPhone);
    this.customersSub = this.customersService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.isLoading = false;
        this.customers = customers;
        //console.log("********************");
        //console.log(this.customers);
        console.log(this.customers.length);
      });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }
}
