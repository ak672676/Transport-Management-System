import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Truck } from "../truck.model";
import { TrucksService } from "../trucks.service";

@Component({
  selector: "app-truck-list",
  templateUrl: "./truck-list.component.html",
  styleUrls: ["./truck-list.component.css"]
})
export class TruckListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is first Post" },
  //   { title: "Second Post", content: "This is second Post" },
  //   { title: "Third Post", content: "This is third Post" }
  // ];
  trucks: Truck[] = [];
  isLoading = false;
  private trucksSub: Subscription;

  //postsService: PostsService;
  constructor(public trucksService: TrucksService) {}

  ngOnInit() {
    this.isLoading = true;
    this.trucksService.getTrucks();
    this.trucksSub = this.trucksService
      .getTruckUpdateListener()
      .subscribe((trucks: Truck[]) => {
        this.isLoading = false;
        this.trucks = trucks;
      });
  }

  onDelete(truckId: string) {
    this.trucksService.deleteTruck(truckId);
  }
  ngOnDestroy() {
    this.trucksSub.unsubscribe();
  }
}
