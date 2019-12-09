import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Bill } from "./models/bill.model";

@Injectable({ providedIn: "root" })
export class BillsService {
  private bills: Bill[] = [];

  private billsUpdated = new Subject<Bill[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addBill(bill: any, customerUniqueId: string, recieverUniqueId: string) {
    console.log(bill);
    console.log(customerUniqueId);
    console.log(recieverUniqueId);
    bill.customerUniqueId = customerUniqueId;
    bill.recieverUniqueId = recieverUniqueId;
    console.log(bill);
    // this.http
    //   .post<{ message: string; bill: Bill }>(
    //     "http://localhost:3000/api/bills/",
    //     bill
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
  }
}
