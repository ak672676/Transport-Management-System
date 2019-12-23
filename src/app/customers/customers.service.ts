import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Customer } from "./customer.model";
import { error } from "util";

import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class CustomersService {
  private customers: Customer[] = [];

  forDelEditOption: boolean = true;

  private customersUpdated = new Subject<Customer[]>();

  ///Testing Billing
  selectedCustomer: Customer = null;
  selectedIdForBill: string = null;
  ///////
  test = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) {}

  getCustomers() {
    //console.log("DATA");
    this.http
      .get<{ message: string; customers: any }>(
        "http://localhost:3000/api/customers"
      )
      .pipe(
        map(customerData => {
          //console.log(customerData);
          return customerData.customers.map(customer => {
            // console.log("Customer=>");
            // console.log(customer);
            return {
              id: customer._id,
              customerId: customer.customerId,
              customerName: customer.customerName,
              street: customer.street,
              city: customer.city,
              state: customer.state,
              country: customer.country,
              pin: customer.pin,
              phone: customer.phone,
              email: customer.email,
              gstNo: customer.gstNo
            };
          });
        })
      )
      .subscribe(transformedCustomers => {
        //console.log("-----------");
        //console.log(transformedCustomers);
        this.customers = transformedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getCustomerUpdateListener() {
    return this.customersUpdated.asObservable();
  }

  getCustomer(id: string) {
    return this.http.get<{
      _id: string;
      customerId: number;
      customerName: string;
      street: string;
      city: string;
      state: string;
      country: string;
      pin: string;
      phone: string;
      email: string;
      gstNo: string;
    }>("http://localhost:3000/api/customers/" + id);
  }

  addCustomer(
    customerId: number,
    customerName: string,
    street: string,
    city: string,
    state: string,
    country: string,
    pin: string,
    phone: string,
    email: string,
    gstNo: string
  ) {
    const customerData = {
      customerId: customerId,
      customerName: customerName,
      street: street,
      city: city,
      state: state,
      country: country,
      pin: pin,
      phone: phone,
      email: email,
      gstNo: gstNo
    };
    console.log("->>", customerData);
    this.http
      .post<{ message: string; customer: Customer }>(
        "http://localhost:3000/api/customers/",
        customerData
      )
      .subscribe(responseData => {
        const customer: Customer = {
          id: responseData.customer.id,
          customerId: responseData.customer.customerId,
          customerName: customerName,
          street: street,
          city: city,
          state: state,
          country: country,
          pin: pin,
          phone: phone,
          email: email,
          gstNo: gstNo
        };
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
        this.router.navigate(["/"]);
      });
  }

  updateCustomer(
    id: string,
    customerId: number,
    customerName: string,
    street: string,
    city: string,
    state: string,
    country: string,
    pin: string,
    phone: string,
    email: string,
    gstNo: string
  ) {
    const customer: Customer = {
      id: id,
      customerId: customerId,
      customerName: customerName,
      street: street,
      city: city,
      state: state,
      country: country,
      pin: pin,
      phone: phone,
      email: email,
      gstNo: gstNo
    };
    this.http
      .put("http://localhost:3000/api/customers/" + id, customer)
      .subscribe(response => {
        const updateCustomers = [...this.customers];
        const oldCustomerIndex = updateCustomers.findIndex(
          c => c.id === customer.id
        );
        updateCustomers[oldCustomerIndex] = customer;
        this.customers = updateCustomers;
        this.customersUpdated.next([...this.customers]);
        this.router.navigate(["/"]);
      });
  }

  deleteCustomer(customerId: string) {
    this.http
      .delete("http://localhost:3000/api/customers/" + customerId)
      .subscribe(() => {
        const updateCustomers = this.customers.filter(
          customer => customer.id !== customerId
        );
        this.customers = updateCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getSearchCustomers(phone: string) {
    console.log("DATA");
    this.http
      .get<{ message: string; customers: any }>(
        "http://localhost:3000/api/customers/search/" + phone
      )
      .pipe(
        map(customerData => {
          //console.log(customerData);
          return customerData.customers.map(customer => {
            // console.log("Customer=>");
            // console.log(customer);
            return {
              id: customer._id,
              customerId: customer.customerId,
              customerName: customer.customerName,
              street: customer.street,
              city: customer.city,
              state: customer.state,
              country: customer.country,
              pin: customer.pin,
              phone: customer.phone,
              email: customer.email,
              gstNo: customer.gstNo
            };
          });
        })
      )
      .subscribe(transformedCustomers => {
        //console.log("-----------");
        //console.log(transformedCustomers);
        this.customers = transformedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }
}
