import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { City } from "./city.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class CitiesService {
  private cities: City[] = [];
  private citiesUpdated = new Subject<City[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCities() {
    this.http
      .get<{ message: string; cities: any }>("http://localhost:3000/api/cities")
      .pipe(
        map(cityData => {
          return cityData.cities.map(city => {
            return {
              cityName: city.cityName,
              landmark: city.landmark,
              id: city._id,
              pin: city.pin,
              manager: city.manager
            };
          });
        })
      )
      .subscribe(transformedCities => {
        this.cities = transformedCities;
        this.citiesUpdated.next([...this.cities]);
      });
  }

  getCityUpdateListener() {
    return this.citiesUpdated.asObservable();
  }

  getCity(id: string) {
    return this.http.get<{
      _id: string;
      cityName: string;
      landmark: string;
      pin: string;
      manager: string;
    }>("http://localhost:3000/api/cities/" + id);
  }

  addCity(cityName: string, landmark: string, pin: string, manager: string) {
    const cityData = {
      cityName: cityName,
      landmark: landmark,
      pin: pin,
      manager: manager
    };

    //console.log(cityName);
    //console.log("->>" + cityData.get("pin"));
    this.http
      .post<{ message: string; city: City }>(
        "http://localhost:3000/api/cities/",
        cityData
      )
      .subscribe(responseData => {
        const city: City = {
          id: responseData.city.id,
          cityName: cityName,
          landmark: landmark,
          pin: pin,
          manager: manager
        };
        this.cities.push(city);
        this.citiesUpdated.next([...this.cities]);
        this.router.navigate(["/"]);
      });
  }

  updateCity(
    id: string,
    cityName: string,
    landmark: string,
    pin: string,
    manager: string
  ) {
    const city: City = {
      id: id,
      cityName: cityName,
      landmark: landmark,
      pin: pin,
      manager: manager
    };
    this.http
      .put("http://localhost:3000/api/cities/" + id, city)
      .subscribe(response => {
        const updatedCities = [...this.cities];
        const oldCityIndex = updatedCities.findIndex(c => c.id === city.id);
        updatedCities[oldCityIndex] = city;
        this.cities = updatedCities;
        this.citiesUpdated.next([...this.cities]);
        this.router.navigate(["/"]);
      });
  }

  deleteCity(cityId: string) {
    this.http
      .delete("http://localhost:3000/api/cities/" + cityId)
      .subscribe(() => {
        const updatedCities = this.cities.filter(city => city.id !== cityId);
        this.cities = updatedCities;
        this.citiesUpdated.next([...this.cities]);
      });
  }
}
