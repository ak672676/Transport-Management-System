import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Customer } from "../customer.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-customer-create",
  templateUrl: "customer-create.component.html",
  styleUrls: ["./customer-create.component.css"]
})
export class CustomerCreateComponent {
  isLoading = false;
  form: FormGroup;

  private mode = "create";
  public edit: boolean = false;
  private customerId: string;
  customer: Customer;
  name: string;
  constructor(
    public customersService: CustomersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      customerName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      customerId: new FormControl({ value: null, disabled: true }),
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
      gstNo: new FormControl(null)
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("customerId")) {
        this.mode = "edit";
        this.edit = true;
        this.customerId = paramMap.get("customerId");

        this.isLoading = true;

        this.customersService
          .getCustomer(this.customerId)
          .subscribe(customerData => {
            this.isLoading = false;
            this.customer = {
              id: customerData._id,
              customerId: customerData.customerId,
              customerName: customerData.customerName,
              street: customerData.street,
              city: customerData.city,
              state: customerData.state,
              country: customerData.country,
              pin: customerData.pin,
              phone: customerData.phone,
              email: customerData.email,
              gstNo: customerData.gstNo
            };

            this.form.setValue({
              customerId: this.customer.customerId,
              customerName: this.customer.customerName,
              street: this.customer.street,
              city: this.customer.city,
              state: this.customer.state,
              country: this.customer.country,
              pin: this.customer.pin,
              phone: this.customer.phone,
              email: this.customer.email,
              gstNo: this.customer.gstNo
            });
          });
      } else {
        this.mode = "create";
        this.edit = false;
        this.customerId = null;
      }
    });
  }
  onSaveCustomer() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.customersService.addCustomer(
        this.form.value.customerId,
        this.form.value.customerName,
        this.form.value.street,
        this.form.value.city,
        this.form.value.state,
        this.form.value.country,
        this.form.value.pin,
        this.form.value.phone,
        this.form.value.email,
        this.form.value.gstNo
      );
      console.log("Customer Send to Services");
    } else {
      const long = 10;
      this.customersService.updateCustomer(
        this.customerId,
        this.form.value.customerId,
        this.form.value.customerName,
        this.form.value.street,
        this.form.value.city,
        this.form.value.state,
        this.form.value.country,
        this.form.value.pin,
        this.form.value.phone,
        this.form.value.email,
        this.form.value.gstNo
      );
    }
    this.form.reset();
  }
}
