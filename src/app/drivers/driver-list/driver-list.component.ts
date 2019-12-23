import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Driver } from "../driver.model";
import { DriversService } from "../drivers.service";

@Component({
  selector: "app-driver-list",
  templateUrl: "./driver-list.component.html",
  styleUrls: ["./driver-list.component.css"]
})
export class DriverListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is first Post" },
  //   { title: "Second Post", content: "This is second Post" },
  //   { title: "Third Post", content: "This is third Post" }
  // ];
  drivers: Driver[] = [];
  isLoading = false;
  private driversSub: Subscription;

  //postsService: PostsService;
  constructor(public driversService: DriversService) {}

  ngOnInit() {
    this.isLoading = true;
    this.driversService.getDrivers();
    this.driversSub = this.driversService
      .getDriverUpdateListener()
      .subscribe((drivers: Driver[]) => {
        this.isLoading = false;
        this.drivers = drivers;
        console.log(drivers);
      });
  }

  onDelete(driverId: string) {
    this.driversService.deleteDriver(driverId);
  }
  ngOnDestroy() {
    this.driversSub.unsubscribe();
  }
}
