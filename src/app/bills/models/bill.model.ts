import { Item } from "../models/item.model";
import { Customer } from "../../customers/customer.model";

export interface Bill {
  id: string;
  billId: number;
  customer: Customer;
  reciever: Customer;
  amount: number;
  status: string[];
  items: Item[];
}
