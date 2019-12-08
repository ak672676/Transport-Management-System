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
//import {RouteStatus} "../models/routeStatus.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
//import { CustomersService } from "../customers.service";

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

  private mode = "create";
  public edit: boolean = false;
  private billId: string;
  bill: Bill;

  constructor(private formBuilder: FormBuilder) {}
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
  }

  updateCity(): FormGroup {
    console.log("1111111111---------------");
    return this.formBuilder.group({
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      time: new FormControl(null, {
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addCurrentCity(): void {
    this.routeCovered = this.billForm.get("routeCovered") as FormArray;
    console.log("22222222222---------------");
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
    console.log("22222222222---------------");
    this.items.push(this.addItem());
  }
  onSaveBill() {}
}
