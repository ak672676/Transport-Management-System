import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { City } from "../city.model";
import { CitiesService } from "../cities.service";

@Component({
  selector: "app-city-list",
  templateUrl: "./city-list.component.html",
  styleUrls: ["./city-list.component.css"]
})
export class CityListComponent implements OnInit, OnDestroy {
  // cities = [
  //   {
  //     cityName: "First Post",
  //     landmark: "This is first Post",
  //     pin: "123",
  //     manager: "AMit"
  //   }
  // ];
  cities: City[] = [];
  isLoading = false;
  private citiesSub: Subscription;

  constructor(public citiesService: CitiesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.citiesService.getCities();
    this.citiesSub = this.citiesService
      .getCityUpdateListener()
      .subscribe((cities: City[]) => {
        this.isLoading = false;
        this.cities = cities;
      });
  }
  onDelete(cityId: string) {
    this.citiesService.deleteCity(cityId);
  }
  ngOnDestroy() {
    this.citiesSub.unsubscribe();
  }
}
