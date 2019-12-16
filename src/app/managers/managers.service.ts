import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";

import { map } from "rxjs/operators";
import { error } from "util";
import { Manager } from "./manager.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ManagersService {
  private managers: Manager[] = [];
  private managersUpdated = new Subject<Manager[]>();

  ///Login
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  public city: string;
  private isAdmin: string;
  private managerName: string;
  private authStatusListener = new Subject<boolean>();

  /////
  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        city: string;
        isAdmin: string;
        managerName: string;
      }>("http://localhost:3000/api/managers" + "/login", authData)
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.city = response.city;
            this.isAdmin = response.isAdmin;
            this.managerName = response.managerName;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(
              token,
              expirationDate,
              this.userId,
              this.city,
              this.isAdmin,
              this.managerName
            );
            console.log("----->", this.city);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;

      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.city = authInformation.city;
      this.isAdmin = authInformation.isAdmin;
      this.managerName = authInformation.managerName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.city = null;
    this.isAdmin = null;
    this.managerName = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    city: string,
    isAdmin: string,
    managerName: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("city", city);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("managerName", managerName);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("city");
    localStorage.removeItem("managerName");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const city = localStorage.getItem("city");
    const managerName = localStorage.getItem("managerName");
    const isAdmin = localStorage.getItem("isAdmin");
    if (!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      city: city,
      isAdmin: isAdmin,
      managerName: managerName
    };
  }

  getManagers() {
    //return [...this.posts];
    this.http
      .get<{ message: string; managers: any }>(
        "http://localhost:3000/api/managers"
      )
      .pipe(
        map(managerData => {
          //console.log(managerData);
          return managerData.managers.map(manager => {
            //console.log("Customer=>");
            //console.log(manager);
            return {
              name: manager.name,
              sex: manager.sex,
              phone: manager.phone,
              address: manager.address,
              email: manager.email,
              adharNo: manager.adharNo,
              workingCity: manager.workingCity,
              password: manager.password,
              id: manager._id,
              imagePath: manager.imagePath,
              isAdmin: manager.isAdmin
            };
          });
        })
      )
      .subscribe(transformedManagers => {
        console.log("-----------");
        console.log(transformedManagers);
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
      password: string;
      workingCity: string;
      imagePath: string;
      isAdmin: string;
    }>("http://localhost:3000/api/managers/" + id);
  }

  addManager(
    name: string,
    sex: string,
    phone: string,
    address: string,
    email: string,
    adharNo: string,
    password: string,
    workingCity: string,
    image: File,
    isAdmin: string
  ) {
    //const post: Post = { id: null, title: title, content: content };
    const managerData = new FormData();
    managerData.append("name", name);
    managerData.append("sex", sex);
    managerData.append("phone", phone);
    managerData.append("address", address);
    managerData.append("email", email);
    managerData.append("adharNo", adharNo);
    managerData.append("password", password);
    managerData.append("workingCity", workingCity);
    managerData.append("image", image, name);
    managerData.append("isAdmin", isAdmin);
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
          password: password,
          workingCity: workingCity,
          imagePath: responseData.manager.imagePath,
          isAdmin: isAdmin
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
    password: string,
    workingCity: string,
    image: File | string,
    isAdmin: string
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
      managerData.append("password", password);
      managerData.append("workingCity", workingCity);
      managerData.append("imagePath", image, name);
      managerData.append("isAdmin", isAdmin);
    } else {
      managerData = {
        id: id,
        name: name,
        sex: sex,
        phone: phone,
        address: address,
        email: email,
        adharNo: adharNo,
        password: password,
        workingCity: workingCity,
        imagePath: image,
        isAdmin: isAdmin
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
          password: password,
          workingCity: workingCity,
          imagePath: "",
          isAdmin: isAdmin
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
