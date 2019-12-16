import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { City } from "../city.model";
import { CitiesService } from "../cities.service";
import { ManagersService } from "../../managers/managers.service";

@Component({
  selector: "app-city-bill-list",
  templateUrl: "./city-bills-list.component.html",
  styleUrls: ["./city-bills-list.component.css"]
})
export class CityBillListComponent {
  // cities = [
  //   {
  //     cityName: "First Post",
  //     landmark: "This is first Post",
  //     pin: "123",
  //     manager: "AMit"
  //   }
  // ];
  selectedCityBills: { id: string; billId: string }[] = [];
  isLoading = false;
  city: string;
  //private citiesSub: Subscription;

  constructor(
    public citiesService: CitiesService,
    public authService: ManagersService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.city = localStorage.getItem("city");
    console.log("Login city", this.authService.city);
    this.citiesService
      .getCityByCityName(this.authService.city)
      .subscribe(cityData => {
        console.log("uuuuuuuuuuuuuuuuuuuuuuu--->", cityData);
        this.isLoading = false;
        // this.selectedCity = {
        //   id: cityData._id,
        //   cityId: cityData.cityId,
        //   landmark: cityData.landmark,
        //   cityName: cityData.cityName,
        //   state: cityData.state,
        //   country: cityData.country,
        //   pin: cityData.pin,
        //   phone: cityData.phone,
        //   billsForTheCity: cityData.billsForTheCity
        // };
        this.selectedCityBills = cityData.billsForTheCity;
        console.log("Bill CIty----------->", this.selectedCityBills);
      });
    console.log("Bill CIty----------->", this.selectedCityBills);
  }
}
