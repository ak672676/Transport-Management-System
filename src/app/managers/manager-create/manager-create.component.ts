import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ManagersService } from "../managers.service";
import { CitiesService } from "../../cities/cities.service";
import { mimeType } from "./mime-type.validator";
import { Subscription, from } from "rxjs";
import { Manager } from "../manager.model";
import { City } from "../../cities/city.model";

@Component({
  selector: "app-manager-create",
  templateUrl: "manager-create.component.html",
  styleUrls: ["./manager-create.component.css"]
})
export class ManagerCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private managerId: string;
  manager: Manager;

  citiesList: City[] = [];

  private authStatusSub: Subscription;
  private citiesSub: Subscription;
  constructor(
    public managersService: ManagersService,
    public route: ActivatedRoute,
    public citiesService: CitiesService
  ) {}

  ngOnInit() {
    this.citiesService.getCities();
    this.citiesSub = this.citiesService
      .getCityUpdateListener()
      .subscribe((cities: City[]) => {
        this.isLoading = false;
        this.citiesList = cities;
      });

    this.authStatusSub = this.managersService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
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
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      adharNo: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      workingCity: new FormControl(null, {
        validators: [Validators.required]
      }),
      isAdmin: new FormControl(true)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("managerId")) {
        this.mode = "edit";
        this.managerId = paramMap.get("managerId");

        this.isLoading = true;

        this.managersService
          .getManager(this.managerId)
          .subscribe(managerData => {
            this.isLoading = false;
            this.manager = {
              id: managerData._id,
              name: managerData.name,
              sex: managerData.sex,
              phone: managerData.phone,
              address: managerData.address,
              email: managerData.email,
              adharNo: managerData.adharNo,
              password: managerData.password,
              workingCity: managerData.workingCity,
              imagePath: managerData.imagePath,
              isAdmin: managerData.isAdmin
            };
            console.log(
              managerData.workingCity + " and  " + managerData.imagePath
            );
            this.form.setValue({
              name: this.manager.name,
              sex: this.manager.sex,
              phone: this.manager.phone,
              address: this.manager.address,
              email: this.manager.email,
              adharNo: this.manager.adharNo,
              password: this.manager.password,
              workingCity: this.manager.workingCity,
              image: this.manager.imagePath,
              isAdmin: this.manager.isAdmin
            });
          });
      } else {
        this.mode = "create";
        this.managerId = null;
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

  onSaveManager() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.managersService.addManager(
        this.form.value.name,
        this.form.value.sex,
        this.form.value.phone,
        this.form.value.address,
        this.form.value.email,
        this.form.value.adharNo,
        this.form.value.password,
        this.form.value.workingCity,
        this.form.value.image,
        this.form.value.isAdmin
      );
      console.log(this.form.value.isAdmin);
    } else {
      this.managersService.updateManager(
        this.managerId,
        this.form.value.name,
        this.form.value.sex,
        this.form.value.phone,
        this.form.value.address,
        this.form.value.email,
        this.form.value.adharNo,
        this.form.value.password,
        this.form.value.workingCity,
        this.form.value.image,
        this.form.value.isAdmin
      );
    }
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };

    this.form.reset();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
