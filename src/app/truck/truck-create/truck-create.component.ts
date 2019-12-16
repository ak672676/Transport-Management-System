import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { TrucksService } from "../trucks.service";
import { Truck } from "../truck.model";

@Component({
  selector: "app-truck-create",
  templateUrl: "./truck-create.component.html",
  styleUrls: ["./truck-create.component.css"]
})
export class TruckCreateComponent implements OnInit {
  // enteredTitle = "";
  // enteredContent = "";
  isLoading = false;
  form: FormGroup;
  //imagePreview: string;
  private mode = "create";
  private truckId: string;
  truck: Truck;

  constructor(
    public trucksService: TrucksService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      make: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      model: new FormControl(null, {
        validators: [Validators.required]
      }),
      chassisNo: new FormControl(null, {
        validators: [Validators.required]
      }),
      vehicleNo: new FormControl(null, {
        validators: [Validators.required]
      }),
      insCompany: new FormControl(null, {
        validators: [Validators.required]
      }),
      insNumber: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastServiceDate: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("truckId")) {
        this.mode = "edit";
        this.truckId = paramMap.get("truckId");

        this.isLoading = true;

        this.trucksService.getTruck(this.truckId).subscribe(truckData => {
          this.isLoading = false;
          this.truck = {
            id: truckData._id,
            truckId: truckData.truckId,
            make: truckData.make,
            model: truckData.model,
            chassisNo: truckData.chassisNo,
            vehicleNo: truckData.vehicleNo,
            insCompany: truckData.insCompany,
            insNumber: truckData.insNumber,
            lastServiceDate: truckData.lastServiceDate,
            driverName: truckData.driverName,
            driverId: truckData.driverId,
            billsForTheTruck: truckData.billsForTheTruck
          };
          this.form.setValue({
            make: this.truck.make,
            model: this.truck.model,
            chassisNo: this.truck.chassisNo,
            vehicleNo: this.truck.vehicleNo,
            insCompany: this.truck.insCompany,
            insNumber: this.truck.insNumber,
            lastServiceDate: this.truck.lastServiceDate
          });
        });
      } else {
        this.mode = "create";
        this.truckId = null;
      }
    });
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get("image").updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onSaveTruck() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.trucksService.addTruck(
        this.form.value.make,
        this.form.value.model,
        this.form.value.chassisNo,
        this.form.value.vehicleNo,
        this.form.value.insCompany,
        this.form.value.insNumber,
        this.form.value.lastServiceDate
      );
    } else {
      this.trucksService.updateTruck(
        this.truckId,
        this.truck.truckId,
        this.form.value.make,
        this.form.value.model,
        this.form.value.chassisNo,
        this.form.value.vehicleNo,
        this.form.value.insCompany,
        this.form.value.insNumber,
        this.form.value.lastServiceDate,
        this.form.value.driverName,
        this.form.value.driverId,
        this.form.value.billsForTheTruck
      );
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };

    this.form.reset();
  }
}
