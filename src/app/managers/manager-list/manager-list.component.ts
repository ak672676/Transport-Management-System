import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Manager } from "../manager.model";
import { ManagersService } from "../managers.service";

@Component({
  selector: "app-manager-list",
  templateUrl: "./manager-list.component.html",
  styleUrls: ["./manager-list.component.css"]
})
export class ManagerListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is first Post" },
  //   { title: "Second Post", content: "This is second Post" },
  //   { title: "Third Post", content: "This is third Post" }
  // ];
  managers: Manager[] = [];
  isLoading = false;
  private managersSub: Subscription;

  //postsService: PostsService;
  constructor(public managersService: ManagersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.managersService.getManagers();
    this.managersSub = this.managersService
      .getManagerUpdateListener()
      .subscribe((managers: Manager[]) => {
        this.isLoading = false;
        this.managers = managers;
      });
  }

  onDelete(managerId: string) {
    this.managersService.deleteManager(managerId);
  }
  ngOnDestroy() {
    this.managersSub.unsubscribe();
  }
}
