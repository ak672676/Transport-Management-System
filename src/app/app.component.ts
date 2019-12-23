import { Component, OnDestroy, OnInit } from "@angular/core";
import { ManagersService } from "./managers/managers.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "TMS";
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: ManagersService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        console.log("Loggin->", isAuthenticated);
      });
    console.log("----------------------->");
    console.log("----------------------->");
    console.log(this.userIsAuthenticated);
    console.log("----------------------->");
    console.log("----------------------->");
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
