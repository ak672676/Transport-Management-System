import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ManagersService } from "../managers.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-manager-login",
  templateUrl: "./manager-login.component.html",
  styleUrls: ["./manager-login.component.css"]
})
export class ManagerLoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public managersService: ManagersService) {}

  ngOnInit() {
    this.authStatusSub = this.managersService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    this.managersService.login(form.value.email, form.value.password);
    console.log(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
