import { Component, OnDestroy, OnInit } from "@angular/core";
import { ManagersService } from "./managers/managers.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "TMS";
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: ManagersService) {}

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        //console.log("Loggin->", this.authService.isAdmin);
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
