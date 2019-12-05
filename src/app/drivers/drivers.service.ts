import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Driver } from "./driver.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class DriversService {
  private drivers: Driver[] = [];
  private driversUpdated = new Subject<Driver[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getDrivers() {
    //return [...this.posts];
    this.http
      .get<{ message: string; drivers: any }>(
        "http://localhost:3000/api/drivers"
      )
      .pipe(
        map(driverData => {
          return driverData.drivers.map(driver => {
            return {
              name: driver.name,
              sex: driver.sex,
              phone: driver.phone,
              address: driver.address,
              drivingLic: driver.drivingLic,
              adharNo: driver.adharNo,
              vehicleNo: driver.vehicleNo,
              id: driver._id,
              imagePath: driver.imagePath
            };
          });
        })
      )
      .subscribe(transformedDrivers => {
        this.drivers = transformedDrivers;
        this.driversUpdated.next([...this.drivers]);
      });
  }

  getDriverUpdateListener() {
    return this.driversUpdated.asObservable();
  }

  getDriver(id: string) {
    //return { ...this.posts.find(p => p.id === id) };
    return this.http.get<{
      _id: string;
      name: string;
      sex: string;
      phone: string;
      address: string;
      drivingLic: string;
      adharNo: string;
      vehicleNo: string;
      imagePath: string;
    }>("http://localhost:3000/api/drivers/" + id);
  }

  addDriver(
    name: string,
    sex: string,
    phone: string,
    address: string,
    drivingLic: string,
    adharNo: string,
    vehicleNo: string,
    image: File
  ) {
    //const post: Post = { id: null, title: title, content: content };
    const driverData = new FormData();
    driverData.append("name", name);
    driverData.append("sex", sex);
    driverData.append("phone", phone);
    driverData.append("address", address);
    driverData.append("drivingLic", drivingLic);
    driverData.append("adharNo", adharNo);
    driverData.append("vehicleNo", vehicleNo);
    driverData.append("image", image, name);
    this.http
      .post<{ message: string; driver: Driver }>(
        "http://localhost:3000/api/drivers",
        driverData
      )
      .subscribe(responseData => {
        const driver: Driver = {
          id: responseData.driver.id,
          name: name,
          sex: sex,
          phone: phone,
          address: address,
          drivingLic: drivingLic,
          adharNo: adharNo,
          vehicleNo: vehicleNo,
          imagePath: responseData.driver.imagePath
        };
        this.drivers.push(driver);
        this.driversUpdated.next([...this.drivers]);
        this.router.navigate(["/"]);
      });
  }

  updateDriver(
    id: string,
    name: string,
    sex: string,
    phone: string,
    address: string,
    drivingLic: string,
    adharNo: string,
    vehicleNo: string,
    image: File | string
  ) {
    // const driver: Driver = {
    //   id: id,
    //   name: name,
    //   sex: sex,
    //   phone: phone,
    //   address: address,
    //   drivingLic: drivingLic,
    //   adharNo: adharNo,
    //   vehicleNo: vehicleNo,
    //   imagePath: null
    // };
    let driverData: Driver | FormData;
    if (typeof image === "object") {
      driverData = new FormData();
      driverData.append("id", id);
      driverData.append("name", name);
      driverData.append("sex", sex);
      driverData.append("phone", phone);
      driverData.append("address", address);
      driverData.append("drivingLic", drivingLic);
      driverData.append("adharNo", adharNo);
      driverData.append("vehicleNo", vehicleNo);
      driverData.append("imagePath", image, name);
    } else {
      driverData = {
        id: id,
        name: name,
        sex: sex,
        phone: phone,
        address: address,
        drivingLic: drivingLic,
        adharNo: adharNo,
        vehicleNo: vehicleNo,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3000/api/drivers/" + id, driverData)
      .subscribe(response => {
        const updatedDrivers = [...this.drivers];
        const oldDriverIndex = updatedDrivers.findIndex(d => d.id === id);
        const driver: Driver = {
          id: id,
          name: name,
          sex: sex,
          phone: phone,
          address: address,
          drivingLic: drivingLic,
          adharNo: adharNo,
          vehicleNo: vehicleNo,
          imagePath: ""
        };
        updatedDrivers[oldDriverIndex] = driver;
        this.drivers = updatedDrivers;
        this.driversUpdated.next([...this.drivers]);
        this.router.navigate(["/"]);
      });
  }

  deleteDriver(driverId: string) {
    this.http
      .delete("http://localhost:3000/api/drivers/" + driverId)
      .subscribe(() => {
        const updatedDrivers = this.drivers.filter(
          driver => driver.id !== driverId
        );
        this.drivers = updatedDrivers;
        this.driversUpdated.next([...this.drivers]);
      });
  }
}
