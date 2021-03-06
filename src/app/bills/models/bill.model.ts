import { Item } from "../models/item.model";
import { Customer } from "../../customers/customer.model";
import { RouteStatus } from "./routeStatus.model";
export interface Bill {
  id: string;
  billId: number;
  customerUniqueId: string;
  customerId: string;
  customerName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
  email: string;
  gstNo: string;
  recieverUniqueId: string;
  r_customerId: string;
  r_customerName: string;
  r_street: string;
  r_city: string;
  r_state: string;
  r_country: string;
  r_pin: string;
  r_phone: string;
  r_email: string;
  r_gstNo: string;
  bookingDate: string;
  bookingStatus: string;
  routeCovered: [
    {
      city: string;
      time: string;
      date: string;
      recieved: boolean;
      d_city: string;
      d_time: string;
      d_date: string;
      dispached: boolean;
    }
  ];
  items: [{ description: string; numberOfPackage: string; cost: string }];
  total: number;
}
