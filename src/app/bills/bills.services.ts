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

  addBill(
    billForServer: any,
    customerUniqueId: string,
    recieverUniqueId: string
  ) {
    billForServer.customerUniqueId = customerUniqueId;
    billForServer.recieverUniqueId = recieverUniqueId;

    this.http
      .post<{ message: string; bill: Bill }>(
        "http://localhost:3000/api/bills/",
        billForServer
      )
      .subscribe(
        responseData => {
          const bill: Bill = {
            id: responseData.bill.id,
            billId: responseData.bill.billId,
            customerUniqueId: responseData.bill.customerUniqueId,
            customerName: billForServer.customerName,
            customerId: billForServer.customerId,
            street: billForServer.street,
            city: billForServer.city,
            state: billForServer.state,
            country: billForServer.country,
            pin: billForServer.pin,
            phone: billForServer.phone,
            email: billForServer.email,
            gstNo: billForServer.gstNo,

            recieverUniqueId: responseData.bill.recieverUniqueId,
            r_customerName: billForServer.r_customerName,
            r_customerId: billForServer.r_customerId,
            r_street: billForServer.r_street,
            r_city: billForServer.r_city,
            r_state: billForServer.r_state,
            r_country: billForServer.r_country,
            r_pin: billForServer.r_pin,
            r_phone: billForServer.r_phone,
            r_email: billForServer.r_email,
            r_gstNo: billForServer.r_gstNo,
            bookingDate: billForServer.bookingDate,
            bookingStatus: billForServer.bookingStatus,
            routeCovered: billForServer.routeCovered,
            items: billForServer.items
          };
          // console.log("//////////////////////////");
          // console.log(bill);
          this.bills.push(bill);
          this.billsUpdated.next([...this.bills]);
          console.log("This is Bills", this.bills);
          this.router.navigate(["/"]);
        },
        () => {
          console.log("Error from Bill Backend");
        }
      );
  }

  ////GETTING BILLS

  getBills() {
    this.http
      .get<{ message: string; bills: any }>("http://localhost:3000/api/bills")
      .pipe(
        map(billData => {
          //console.log(customerData);
          return billData.bills.map(bill => {
            // console.log("Customer=>");
            // console.log(customer);
            return {
              id: bill._id,
              billId: bill.billId,
              customerUniqueId: bill.customerUniqueId,
              customerName: bill.customerName,
              customerId: bill.customerId,
              street: bill.street,
              city: bill.city,
              state: bill.state,
              country: bill.country,
              pin: bill.pin,
              phone: bill.phone,
              email: bill.email,
              gstNo: bill.gstNo,

              recieverUniqueId: bill.recieverUniqueId,
              r_customerName: bill.r_customerName,
              r_customerId: bill.r_customerId,
              r_street: bill.r_street,
              r_city: bill.r_city,
              r_state: bill.r_state,
              r_country: bill.r_country,
              r_pin: bill.r_pin,
              r_phone: bill.r_phone,
              r_email: bill.r_email,
              r_gstNo: bill.r_gstNo,
              bookingDate: bill.bookingDate,
              bookingStatus: bill.bookingStatus,
              routeCovered: bill.routeCovered,
              items: bill.items
            };
          });
        })
      )
      .subscribe(transformedBills => {
        //console.log("-----------");
        //console.log(transformedCustomers);
        this.bills = transformedBills;
        this.billsUpdated.next([...this.bills]);
      });
  }

  getBillUpdateListener() {
    return this.billsUpdated.asObservable();
  }
}
