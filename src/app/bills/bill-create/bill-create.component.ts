import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { Bill } from "../models/bill.model";
import { Item } from "../models/item.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { BillsService } from "../bills.services";
import { CustomersService } from "../../customers/customers.service";

@Component({
  selector: "app-bill-create",
  templateUrl: "bill-create.component.html",
  styleUrls: ["./bill-create.component.css"]
})
export class BillCreateComponent {
  isLoading = false;
  billForm: FormGroup;
  items: FormArray;
  routeCovered: FormArray;
  f: FormArray;
  private mode = "create";
  public edit: boolean = false;
  private billId: string;
  bill: Bill;
  showCustomerSearchMenu: boolean = false;
  customerUniqueId: string;
  recieverUniqueId: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private billsService: BillsService,
    private router: Router,
    private customersService: CustomersService
  ) {}
  ngOnInit() {
    this.billForm = this.formBuilder.group({
      billId: new FormControl({ value: null, disabled: true }),
      customerId: new FormControl(null),
      customerName: new FormControl(null, {
        validators: [Validators.required]
      }),
      street: new FormControl(null, {
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      state: new FormControl(null, {
        validators: [Validators.required]
      }),
      country: new FormControl(null, {
        validators: [Validators.required]
      }),
      pin: new FormControl(null, {
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      gstNo: new FormControl(null),
      r_customerName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      r_customerId: new FormControl(null),
      r_street: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_city: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_state: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_country: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_pin: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_phone: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_email: new FormControl(null, {
        validators: [Validators.required]
      }),
      r_gstNo: new FormControl(null),
      bookingDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      bookingStatus: new FormControl(null, {
        validators: [Validators.required]
      }),
      routeCovered: this.formBuilder.array([this.updateCity()]),
      items: this.formBuilder.array([this.addItem()])
    });

    // (<FormArray>this.billForm.get("items")).controls[0]
    //   .get("cost")
    //   .setValue(20);

    this.customersService.forDelEditOption = false;
  }

  updateCity(): FormGroup {
    return this.formBuilder.group({
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      time: new FormControl(null, {
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        validators: [Validators.required]
      }),
      recieved: new FormControl(false)
    });
  }

  addCurrentCity(): void {
    this.routeCovered = this.billForm.get("routeCovered") as FormArray;
    this.routeCovered.push(this.updateCity());
  }

  addItem(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      numberOfPackage: new FormControl(null, {
        validators: [Validators.required]
      }),
      cost: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addItemToGroup(): void {
    this.items = this.billForm.get("items") as FormArray;
    this.items.push(this.addItem());
    this.customersService.test.next(10);
  }

  onDeleteCity(index: number) {
    (<FormArray>this.billForm.get("routeCovered")).removeAt(index);
  }

  onDeleteItem(index: number) {
    (<FormArray>this.billForm.get("items")).removeAt(index);
  }

  onSaveBill() {
    if (this.billForm.invalid) {
      return;
    }

    this.billsService.addBill(
      this.billForm.value,
      this.customerUniqueId,
      this.recieverUniqueId
    );
    console.log("on bill save");
    console.log(this.billForm.value);
    this.billForm.reset();
  }

  onCustomerAutoFill() {
    this.showCustomerSearchMenu = true;
  }
  onCustomerAutoFillFinal() {
    this.showCustomerSearchMenu = false;
    console.log("FROM->", this.customersService.selectedCustomer);
    this.billForm
      .get("customerId")
      .setValue(this.customersService.selectedCustomer.customerId);
    this.billForm
      .get("customerName")
      .setValue(this.customersService.selectedCustomer.customerName);
    this.billForm
      .get("street")
      .setValue(this.customersService.selectedCustomer.street);
    this.billForm
      .get("city")
      .setValue(this.customersService.selectedCustomer.city);
    this.billForm
      .get("state")
      .setValue(this.customersService.selectedCustomer.state);
    this.billForm
      .get("country")
      .setValue(this.customersService.selectedCustomer.country);
    this.billForm
      .get("pin")
      .setValue(this.customersService.selectedCustomer.pin);
    this.billForm
      .get("phone")
      .setValue(this.customersService.selectedCustomer.phone);
    this.billForm
      .get("email")
      .setValue(this.customersService.selectedCustomer.email);
    this.billForm
      .get("gstNo")
      .setValue(this.customersService.selectedCustomer.gstNo);
    this.customerUniqueId = this.customersService.selectedCustomer.id;
    this.customersService.selectedCustomer = null;
  }
  onRecieverAutoFill() {
    this.showCustomerSearchMenu = true;
  }
  onRecieverAutoFillFinal() {
    this.showCustomerSearchMenu = false;
    console.log("FROM->", this.customersService.selectedCustomer);
    this.billForm
      .get("r_customerId")
      .setValue(this.customersService.selectedCustomer.customerId);
    this.billForm
      .get("r_customerName")
      .setValue(this.customersService.selectedCustomer.customerName);
    this.billForm
      .get("r_street")
      .setValue(this.customersService.selectedCustomer.street);
    this.billForm
      .get("r_city")
      .setValue(this.customersService.selectedCustomer.city);
    this.billForm
      .get("r_state")
      .setValue(this.customersService.selectedCustomer.state);
    this.billForm
      .get("r_country")
      .setValue(this.customersService.selectedCustomer.country);
    this.billForm
      .get("r_pin")
      .setValue(this.customersService.selectedCustomer.pin);
    this.billForm
      .get("r_phone")
      .setValue(this.customersService.selectedCustomer.phone);
    this.billForm
      .get("r_email")
      .setValue(this.customersService.selectedCustomer.email);
    this.billForm
      .get("r_gstNo")
      .setValue(this.customersService.selectedCustomer.gstNo);
    this.recieverUniqueId = this.customersService.selectedCustomer.id;
    this.customersService.selectedCustomer = null;
    this.billForm.get("bookingDate").setValue(new Date());
    this.billForm.get("bookingStatus").setValue("queue");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    (<FormArray>this.billForm.get("routeCovered")).controls[0]
      .get("city")
      .setValue(this.billForm.get("city").value);
    (<FormArray>this.billForm.get("routeCovered")).controls[0]
      .get("time")
      .setValue(time);
    (<FormArray>this.billForm.get("routeCovered")).controls[0]
      .get("date")
      .setValue(date);
  }
  OnDestroy() {
    this.customersService.forDelEditOption = true;
  }
}
