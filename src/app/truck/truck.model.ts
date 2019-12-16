export interface Truck {
  id: string;
  truckId: string;
  make: string;
  model: string;
  chassisNo: string;
  vehicleNo: string;
  insCompany: string;
  insNumber: string;
  lastServiceDate: string;
  driverName: string;
  driverId: string;
  billsForTheTruck: [{ id: string; billId: string }];
}
