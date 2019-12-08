import { Item } from "../models/item.model";
import { Customer } from "../../customers/customer.model";
import { RouteStatus } from "./routeStatus.model";
export interface Bill {
  id: string;
  billId: number;
  customer: Customer;
  reciever: Customer;
  amount: number;
  bookingDate: string;
  routeCovered: RouteStatus[];
  bookingStatus: string;
  items: Item[];
}
