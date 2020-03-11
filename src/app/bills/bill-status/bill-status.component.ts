import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Bill } from "../models/bill.model";
import { BillsService } from "../bills.services";

@Component({
  selector: "app-bill-status-list",
  templateUrl: "./bill-status.component.html",
  styleUrls: ["./bill-status.component.css"]
})
export class BillStatusComponent implements OnInit, OnDestroy {
  bills: Bill[] = [];
  isLoading = false;
  private billsSub: Subscription;
  public searchingBillId: string;
  constructor(public billsService: BillsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.billsService.getBills();
    this.billsSub = this.billsService
      .getBillUpdateListener()
      .subscribe((bills: Bill[]) => {
        this.isLoading = false;
        this.bills = bills;
        //console.log("********************");
        //console.log(this.customers);
        console.log(this.bills.length);
      });
    // this.billsService.test.subscribe((n: number) => {
    //   console.log("From=>" + n);
    // });
  }

  // onDelete(customerId: string) {
  //   this.customersService.deleteCustomer(customerId);
  // }

  onBillSelect(billSelected: Bill) {
    //console.log("--->", customerId);
    //this.customersService.selectedCustomer = customerSelected;
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

  onSearch(billId: string) {
    if (billId === "") {
      //this.searchingPhone = phone;
      this.billsService.getBills();
      this.billsSub = this.billsService
        .getBillUpdateListener()
        .subscribe((bills: Bill[]) => {
          this.isLoading = false;
          this.bills = bills;
          //console.log("********************");
          //console.log(this.customers);
          console.log(this.bills.length);
        });
    }
    this.searchingBillId = billId;
    this.billsService.getSearchBills(this.searchingBillId);
    this.billsSub = this.billsService
      .getBillUpdateListener()
      .subscribe((bills: Bill[]) => {
        this.isLoading = false;
        this.bills = bills;
        //console.log("********************");
        //console.log(this.customers);
        console.log(this.bills.length);
      });
  }

  ngOnDestroy() {
    this.billsSub.unsubscribe();
  }
}
