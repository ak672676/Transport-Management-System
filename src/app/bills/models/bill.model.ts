import { Item } from "../models/item.model";
import { Customer } from "../../customers/customer.model";

export interface Bill {
  id: string;
  billId: number;
  customer: Customer;
  reciever: Customer;
  amount: number;
  date: Date;
  routeCovered: string[];
  status: string;
  items: Item[];
}
