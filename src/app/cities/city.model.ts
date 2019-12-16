export interface City {
  id: string;
  cityId: string;
  landmark: string;
  cityName: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
  billsForTheCity: [{ id: string; billId: string }];
}
