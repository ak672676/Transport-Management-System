import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Truck } from "./truck.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class TrucksService {
  private trucks: Truck[] = [];
  private trucksUpdated = new Subject<Truck[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getTrucks() {
    //return [...this.posts];
    this.http
      .get<{ message: string; trucks: any }>("http://localhost:3000/api/trucks")
      .pipe(
        map(truckData => {
          return truckData.trucks.map(truck => {
            return {
              make: truck.make,
              model: truck.model,
              chassisNo: truck.chassisNo,
              vehicleNo: truck.vehicleNo,
              insCompany: truck.insCompany,
              insNumber: truck.insNumber,
              lastServiceDate: truck.lastServiceDate,
              id: truck._id,
              driverName: truck.driverName
            };
          });
        })
      )
      .subscribe(transformedTrucks => {
        this.trucks = transformedTrucks;
        this.trucksUpdated.next([...this.trucks]);
      });
  }

  getTruckUpdateListener() {
    return this.trucksUpdated.asObservable();
  }

  getTruck(id: string) {
    //return { ...this.posts.find(p => p.id === id) };
    return this.http.get<{
      _id: string;
      make: string;
      model: string;
      chassisNo: string;
      vehicleNo: string;
      insCompany: string;
      insNumber: string;
      lastServiceDate: string;
      driverName: string;
    }>("http://localhost:3000/api/trucks/" + id);
  }

  addTruck(
    make: string,
    model: string,
    chassisNo: string,
    vehicleNo: string,
    insCompany: string,
    insNumber: string,
    lastServiceDate: string,
    driverName: string
  ) {
    //const post: Post = { id: null, title: title, content: content };
    const truckData = new FormData();
    truckData.append("make", make);
    truckData.append("model", model);
    truckData.append("chassisNo", chassisNo);
    truckData.append("vehicleNo", vehicleNo);
    truckData.append("insCompany", insCompany);
    truckData.append("insNumber", insNumber);
    truckData.append("lastServiceDate", lastServiceDate);
    truckData.append("driveName", driverName);
    this.http
      .post<{ message: string; truck: Truck }>(
        "http://localhost:3000/api/trucks",
        truckData
      )
      .subscribe(responseData => {
        const truck: Truck = {
          id: responseData.truck.id,
          make: make,
          model: model,
          chassisNo: chassisNo,
          vehicleNo: vehicleNo,
          insCompany: insCompany,
          insNumber: insNumber,
          lastServiceDate: lastServiceDate,
          driverName: driverName
        };
        this.trucks.push(truck);
        this.trucksUpdated.next([...this.trucks]);
        this.router.navigate(["/"]);
      });
  }

  updateTruck(
    id: string,
    make: string,
    model: string,
    chassisNo: string,
    vehicleNo: string,
    insCompany: string,
    insNumber: string,
    lastServiceDate: string,
    driverName: string
  ) {
    const truck: Truck = {
      id: id,
      make: make,
      model: model,
      chassisNo: chassisNo,
      vehicleNo: vehicleNo,
      insCompany: insCompany,
      insNumber: insNumber,
      lastServiceDate: lastServiceDate,
      driverName: driverName
    };
    this.http
      .put("http://localhost:3000/api/trucks/" + id, truck)
      .subscribe(response => {
        const updatedTrucks = [...this.trucks];
        const oldTruckIndex = updatedTrucks.findIndex(t => t.id === truck.id);
        updatedTrucks[oldTruckIndex] = truck;
        this.trucks = updatedTrucks;
        this.trucksUpdated.next([...this.trucks]);
        this.router.navigate(["/"]);
      });
  }

  deleteTruck(truckId: string) {
    this.http
      .delete("http://localhost:3000/api/trucks/" + truckId)
      .subscribe(() => {
        const updatedTrucks = this.trucks.filter(truck => truck.id !== truckId);
        this.trucks = updatedTrucks;
        this.trucksUpdated.next([...this.trucks]);
      });
  }
}
