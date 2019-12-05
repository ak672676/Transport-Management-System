import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { DriversService } from "../drivers.service";
import { Driver } from "../driver.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-driver-create",
  templateUrl: "driver-create.component.html",
  styleUrls: ["./driver-create.component.css"]
})
export class DriverCreateComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private driverId: string;
  driver: Driver;

  constructor(
    public driversService: DriversService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      sex: new FormControl(null, {
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      drivingLic: new FormControl(null, {
        validators: [Validators.required]
      }),
      adharNo: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      vehicleNo: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("driverId")) {
        this.mode = "edit";
        this.driverId = paramMap.get("driverId");

        this.isLoading = true;

        this.driversService.getDriver(this.driverId).subscribe(driverData => {
          this.isLoading = false;
          this.driver = {
            id: driverData._id,
            name: driverData.name,
            sex: driverData.sex,
            phone: driverData.phone,
            address: driverData.address,
            drivingLic: driverData.drivingLic,
            adharNo: driverData.adharNo,
            vehicleNo: driverData.vehicleNo,
            imagePath: driverData.imagePath
          };
          this.form.setValue({
            name: this.driver.name,
            sex: this.driver.sex,
            phone: this.driver.phone,
            address: this.driver.address,
            drivingLic: this.driver.drivingLic,
            adharNo: this.driver.adharNo,
            vehicleNo: this.driver.vehicleNo,
            image: this.driver.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.driverId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveDriver() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.driversService.addDriver(
        this.form.value.name,
        this.form.value.sex,
        this.form.value.phone,
        this.form.value.address,
        this.form.value.drivingLic,
        this.form.value.adharNo,
        this.form.value.vehicleNo,
        this.form.value.image
      );
    } else {
      this.driversService.updateDriver(
        this.driverId,
        this.form.value.name,
        this.form.value.sex,
        this.form.value.phone,
        this.form.value.address,
        this.form.value.drivingLic,
        this.form.value.adharNo,
        this.form.value.vehicleNo,
        this.form.value.image
      );
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };

    this.form.reset();
  }
}
