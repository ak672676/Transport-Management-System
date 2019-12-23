import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { Bill } from "../models/bill.model";
import { BillsService } from "../bills.services";
import { City } from "src/app/cities/city.model";
import { CitiesService } from "src/app/cities/cities.service";
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-bill-update",
  templateUrl: "bill-update.component.html",
  styleUrls: ["./bill-update.component.css"]
})
export class BillUpdateComponent {
  isLoading = false;
  error = false;
  billId: string;
  bill: Bill = null;
  form: FormGroup;

  indexOfRoute: number = null;
  citiesList: City[] = [];
  selectedValue: string;
  openUpdateDiv: boolean = false;
  private billsSub: Subscription;
  private citiesSub: Subscription;
  constructor(
    public route: ActivatedRoute,
    public billsService: BillsService,
    public citiesService: CitiesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.citiesService.getCities();
    this.citiesSub = this.citiesService
      .getCityUpdateListener()
      .subscribe((cities: City[]) => {
        this.isLoading = false;
        this.citiesList = cities;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("billId")) {
        this.isLoading = true;
        this.billId = paramMap.get("billId");

        this.billsService.getBill(this.billId).subscribe(billData => {
          this.isLoading = false;
          this.bill = {
            id: billData._id,
            billId: billData.billId,
            customerUniqueId: billData.customerUniqueId,
            customerId: billData.customerId,
            customerName: billData.customerName,
            street: billData.street,
            city: billData.city,
            state: billData.state,
            country: billData.country,
            pin: billData.pin,
            phone: billData.phone,
            email: billData.email,
            gstNo: billData.gstNo,
            recieverUniqueId: billData.recieverUniqueId,
            r_customerId: billData.r_customerId,
            r_customerName: billData.r_customerName,
            r_street: billData.r_street,
            r_city: billData.r_city,
            r_state: billData.r_state,
            r_country: billData.r_country,
            r_pin: billData.r_pin,
            r_phone: billData.r_phone,
            r_email: billData.r_email,
            r_gstNo: billData.r_gstNo,
            bookingDate: billData.bookingDate,
            bookingStatus: billData.bookingStatus,
            routeCovered: billData.routeCovered,
            items: billData.items
          };
          console.log("pppppppppppppppppppppp");
          console.log(this.bill);
          for (let i = 0; i < this.bill.routeCovered.length; i++) {
            if (
              this.bill.routeCovered[i].city === localStorage.getItem("city")
            ) {
              this.indexOfRoute = i;
              console.log("pppppppppppppppppppppp");
              break;
            }
          }
        });
      } else {
        this.error = true;
      }
    });
  }

  onupdate() {
    this.openUpdateDiv = true;
    this.form = new FormGroup({
      d_city: new FormControl(null, {
        validators: [Validators.required]
      }),
      d_date: new FormControl(null, {
        validators: [Validators.required]
      }),
      d_time: new FormControl(null, {
        validators: [Validators.required]
      }),
      dispached: new FormControl(true)
    });

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    this.form.get("d_date").setValue(date);
    this.form.get("d_time").setValue(time);
  }

  onBillUpdate() {
    console.log(this.form.value);
    this.bill.routeCovered[this.indexOfRoute].d_time = this.form.value.d_time;
    this.bill.routeCovered[this.indexOfRoute].d_date = this.form.value.d_date;
    this.bill.routeCovered[this.indexOfRoute].d_city = this.form.value.d_city;
    this.bill.routeCovered[this.indexOfRoute].dispached = true;
    let a = {
      city: this.form.value.d_city,
      time: this.form.value.time,
      date: this.form.value.date,
      recieved: false,
      d_city: null,
      d_date: null,
      d_time: null,
      dispached: null
    };
    this.bill.routeCovered.push(a);

    console.log("On Update---->", this.bill.routeCovered[this.indexOfRoute]);

    //////////////////////////
    this.billsService.onUpdateBillAndCity(
      this.bill.id,
      this.bill.billId,
      this.bill.customerUniqueId,
      this.bill.customerId,
      this.bill.customerName,
      this.bill.street,
      this.bill.city,
      this.bill.state,
      this.bill.country,
      this.bill.pin,
      this.bill.phone,
      this.bill.email,
      this.bill.gstNo,
      this.bill.recieverUniqueId,
      this.bill.r_customerId,
      this.bill.r_customerName,
      this.bill.r_street,
      this.bill.r_city,
      this.bill.r_state,
      this.bill.r_country,
      this.bill.r_pin,
      this.bill.r_phone,
      this.bill.r_email,
      this.bill.r_gstNo,
      this.bill.bookingDate,
      this.bill.bookingStatus,
      this.bill.routeCovered,
      this.bill.items,
      this.form.value.d_city
    );
  }

  onBillRecieved() {
    this.bill.routeCovered[this.indexOfRoute].recieved = true;

    // console.log("Length of bill-->", this.bill.routeCovered.length);
    // console.log(this.bill.routeCovered[0].city);
    // console.log(localStorage.getItem("city"));
    this.billsService.onUpdateBill(
      this.bill.id,
      this.bill.billId,
      this.bill.customerUniqueId,
      this.bill.customerId,
      this.bill.customerName,
      this.bill.street,
      this.bill.city,
      this.bill.state,
      this.bill.country,
      this.bill.pin,
      this.bill.phone,
      this.bill.email,
      this.bill.gstNo,
      this.bill.recieverUniqueId,
      this.bill.r_customerId,
      this.bill.r_customerName,
      this.bill.r_street,
      this.bill.r_city,
      this.bill.r_state,
      this.bill.r_country,
      this.bill.r_pin,
      this.bill.r_phone,
      this.bill.r_email,
      this.bill.r_gstNo,
      this.bill.bookingDate,
      this.bill.bookingStatus,
      this.bill.routeCovered,
      this.bill.items
    );
  }
}
