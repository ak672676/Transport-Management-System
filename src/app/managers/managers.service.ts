import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Manager } from "./manager.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ManagersService {
  private managers: Manager[] = [];
  private managersUpdated = new Subject<Manager[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getManagers() {
    //return [...this.posts];
    this.http
      .get<{ message: string; managers: any }>(
        "http://localhost:3000/api/managers"
      )
      .pipe(
        map(managerData => {
          return managerData.managers.map(manager => {
            return {
              name: manager.name,
              sex: manager.sex,
              phone: manager.phone,
              address: manager.address,
              email: manager.email,
              adharNo: manager.adharNo,
              workingCity: manager.workingCity,
              id: manager._id,
              imagePath: manager.imagePath
            };
          });
        })
      )
      .subscribe(transformedManagers => {
        this.managers = transformedManagers;
        this.managersUpdated.next([...this.managers]);
      });
  }

  getManagerUpdateListener() {
    return this.managersUpdated.asObservable();
  }

  getManager(id: string) {
    //return { ...this.posts.find(p => p.id === id) };
    return this.http.get<{
      _id: string;
      name: string;
      sex: string;
      phone: string;
      address: string;
      email: string;
      adharNo: string;
      workingCity: string;
      imagePath: string;
    }>("http://localhost:3000/api/managers/" + id);
  }

  addManager(
    name: string,
    sex: string,
    phone: string,
    address: string,
    email: string,
    adharNo: string,
    workingCity: string,
    image: File
  ) {
    //const post: Post = { id: null, title: title, content: content };
    const managerData = new FormData();
    managerData.append("name", name);
    managerData.append("sex", sex);
    managerData.append("phone", phone);
    managerData.append("address", address);
    managerData.append("email", email);
    managerData.append("adharNo", adharNo);
    managerData.append("workingCity", workingCity);
    managerData.append("image", image, name);
    //{
    //   name: name,
    //   sex: sex,
    //   phone: phone,
    //   address: address,
    //   email: email,
    //   adharNo: adharNo,
    //   workingCity: workingCity,
    //   image: name
    // };

    console.log(managerData.get("image"));
    //console.log("/n" + managerData.get("image"));
    this.http
      .post<{ message: string; manager: Manager }>(
        "http://localhost:3000/api/managers",
        managerData
      )
      .subscribe(responseData => {
        const manager: Manager = {
          id: responseData.manager.id,
          name: name,
          sex: sex,
          phone: phone,
          address: address,
          email: email,
          adharNo: adharNo,
          workingCity: workingCity,
          imagePath: responseData.manager.imagePath
        };
        this.managers.push(manager);
        this.managersUpdated.next([...this.managers]);
        this.router.navigate(["/"]);
      });
  }

  updateManager(
    id: string,
    name: string,
    sex: string,
    phone: string,
    address: string,
    email: string,
    adharNo: string,
    workingCity: string,
    image: File | string
  ) {
    // const manager: Manager = {
    //   id: id,
    //   name: name,
    //   sex: sex,
    //   phone: phone,
    //   address: address,
    //   email: email,
    //   adharNo: adharNo,
    //   workingCity: workingCity,
    //   imagePath: ""
    // };
    let managerData: Manager | FormData;
    if (typeof image === "object") {
      managerData = new FormData();
      managerData.append("id", id);
      managerData.append("name", name);
      managerData.append("sex", sex);
      managerData.append("phone", phone);
      managerData.append("address", address);
      managerData.append("email", email);
      managerData.append("adharNo", adharNo);
      managerData.append("workingCity", workingCity);
      managerData.append("imagePath", image, name);
    } else {
      managerData = {
        id: id,
        name: name,
        sex: sex,
        phone: phone,
        address: address,
        email: email,
        adharNo: adharNo,
        workingCity: workingCity,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3000/api/managers/" + id, managerData)
      // .put("http://localhost:3000/api/managers/" + id, manager)
      // .subscribe(response => {
      //   const updatedManagers = [...this.managers];
      //   const oldManagerIndex = updatedManagers.findIndex(
      //     m => m.id === manager.id
      //   );

      //   updatedManagers[oldManagerIndex] = manager;
      //   this.managers = updatedManagers;
      //   this.managersUpdated.next([...this.managers]);
      //   this.router.navigate(["/"]);
      // });
      .subscribe(response => {
        const updatedManagers = [...this.managers];
        const oldManagerIndex = updatedManagers.findIndex(m => m.id === id);
        const manager: Manager = {
          id: id,
          name: name,
          sex: sex,
          phone: phone,
          address: address,
          email: email,
          adharNo: adharNo,
          workingCity: workingCity,
          imagePath: ""
        };
        updatedManagers[oldManagerIndex] = manager;
        this.managers = updatedManagers;
        this.managersUpdated.next([...this.managers]);
        this.router.navigate(["/"]);
      });
  }

  deleteManager(managerId: string) {
    this.http
      .delete("http://localhost:3000/api/managers/" + managerId)
      .subscribe(
        () => {
          const updatedManagers = this.managers.filter(
            manager => manager.id !== managerId
          );
          this.managers = updatedManagers;
          this.managersUpdated.next([...this.managers]);
        },
        err => console.error("Observer got an error: " + err)
      );
  }
}
