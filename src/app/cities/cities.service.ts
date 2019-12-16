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
              id: city._id,
              cityId: city.cityId,
              landmark: city.landmark,
              cityName: city.cityName,
              state: city.state,
              country: city.country,
              pin: city.pin,
              phone: city.phone,
              billsForTheCity: city.billsForTheCity
            };
          });
        })
      )
      .subscribe(transformedCities => {
        console.log(transformedCities);
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
      cityId: string;
      landmark: string;
      cityName: string;
      state: string;
      country: string;
      pin: string;
      phone: string;
      billsForTheCity: [{ id: string; billId: string }];
    }>("http://localhost:3000/api/cities/" + id);
  }

  getCityByCityName(cityName: string) {
    console.log("CItyName", cityName);
    return this.http.get<{
      _id: string;
      cityId: string;
      landmark: string;
      cityName: string;
      state: string;
      country: string;
      pin: string;
      phone: string;
      billsForTheCity: [{ id: string; billId: string }];
    }>("http://localhost:3000/api/cities/bills/" + cityName);
  }

  addCity(
    landmark: string,
    cityName: string,
    state: string,
    country: string,
    pin: string,
    phone: string
  ) {
    const cityData = {
      landmark: landmark,
      cityName: cityName,
      state: state,
      country: country,
      pin: pin,
      phone: phone
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
          cityId: responseData.city.cityId,
          landmark: landmark,
          cityName: cityName,
          state: state,
          country: country,
          pin: pin,
          phone: phone,
          billsForTheCity: null
        };

        this.cities.push(city);
        this.citiesUpdated.next([...this.cities]);
        this.router.navigate(["/"]);
      });
  }

  updateCity(
    id: string,
    cityId: string,
    landmark: string,
    cityName: string,
    state: string,
    country: string,
    pin: string,
    phone: string,
    billsForTheCity: [{ id: string; billId: string }]
  ) {
    const city: City = {
      id: id,
      cityId: cityId,
      landmark: landmark,
      cityName: cityName,
      state: state,
      country: country,
      pin: pin,
      phone: phone,
      billsForTheCity: billsForTheCity
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
