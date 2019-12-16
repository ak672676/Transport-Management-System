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

  billsForTheCity: any;
  constructor(
    public citiesService: CitiesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      landmark: new FormControl(null, {
        validators: [Validators.required]
      }),
      cityName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
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
            cityId: cityData.cityId,
            landmark: cityData.landmark,
            cityName: cityData.cityName,
            state: cityData.state,
            country: cityData.country,
            pin: cityData.pin,
            phone: cityData.phone,
            billsForTheCity: cityData.billsForTheCity
          };
          this.billsForTheCity = cityData.billsForTheCity;
          this.form.setValue({
            landmark: this.city.landmark,
            cityName: this.city.cityName,
            state: this.city.state,
            country: this.city.country,
            pin: this.city.pin,
            phone: this.city.phone
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
        this.form.value.landmark,
        this.form.value.cityName,
        this.form.value.state,
        this.form.value.country,
        this.form.value.pin,
        this.form.value.phone
      );
      //console.log(this.form.value.cityName);
    } else {
      this.citiesService.updateCity(
        this.city.id,
        this.city.cityId,
        this.form.value.landmark,
        this.form.value.cityName,
        this.form.value.state,
        this.form.value.country,
        this.form.value.pin,
        this.form.value.phone,
        this.city.billsForTheCity
      );
    }
    this.form.reset();
  }
}
