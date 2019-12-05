import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { City } from "../city.model";
import { CitiesService } from "../cities.service";

@Component({
  selector: "app-city-create",
  templateUrl: "city-create.component.html",
  styleUrls: ["./city-create.component.css"]
})
export class CityCreateComponent implements OnInit {
  enteredCityName = "";
  enteredLandmark = "";
  enteredPin = "";
  enteredManager = "";
  isLoading = false;
  form: FormGroup;
  //imagePreview: string;
  private mode = "create";
  private cityId: string;
  city: City;

  constructor(
    public citiesService: CitiesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      cityName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      landmark: new FormControl(null, {
        validators: [Validators.required]
      }),
      pin: new FormControl(null, {
        validators: [Validators.required]
      }),
      manager: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("cityId")) {
        this.mode = "edit";
        this.cityId = paramMap.get("cityId");

        this.isLoading = true;

        this.citiesService.getCity(this.cityId).subscribe(cityData => {
          this.isLoading = false;
          this.city = {
            id: cityData._id,
            cityName: cityData.cityName,
            landmark: cityData.landmark,
            pin: cityData.pin,
            manager: cityData.manager
          };
          this.form.setValue({
            cityName: this.city.cityName,
            landmark: this.city.landmark,
            pin: this.city.pin,
            manager: this.city.manager
          });
        });
      } else {
        this.mode = "create";
        this.cityId = null;
      }
    });
  }

  onSaveCity() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.citiesService.addCity(
        this.form.value.cityName,
        this.form.value.landmark,
        this.form.value.pin,
        this.form.value.manager
      );
      //console.log(this.form.value.cityName);
      console.log("Added");
    } else {
      this.citiesService.updateCity(
        this.cityId,
        this.form.value.cityName,
        this.form.value.landmark,
        this.form.value.pin,
        this.form.value.manager
      );
    }
    this.form.reset();
  }
}
