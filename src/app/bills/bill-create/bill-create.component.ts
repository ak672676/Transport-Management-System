import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Bill } from "../models/bill.model";
import { Item } from "../models/item.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
//import { CustomersService } from "../customers.service";

@Component({
  selector: "app-bill-create",
  templateUrl: "bill-create.component.html",
  styleUrls: ["./bill-create.component.css"]
})
export class BillCreateComponent {
  isLoading = false;
  form: FormGroup;

  private mode = "create";
  public edit: boolean = false;
  private billId: string;
  bill: Bill;

  constructor() {}
  ngOnInit() {
    this.form = new FormGroup({
      billId: new FormControl({ value: null, disabled: true }),
      customerName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      customerId: new FormControl(null),
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
      /////----------------------//////
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
        validators: [ Validators.required]
      }),
      r_gstNo: new FormControl(null),
      date:    new FormControl(null,{
        validators:[Validators.required]
      }),
      status:new FormControl(null,{
        validators: [Validators.required]
      }),
      routeCovered:new FormArray([]),
      items:new FormArray([]),
      amount:new FormControl(null,{
        validators: [Validators.required]
      })

    });
  }
  addCity(){
    this.form.
  };
}
