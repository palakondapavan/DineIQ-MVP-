import { customerBillApi } from "../api/customerBill.api";

export const customerBillService = {
  getBill:
    customerBillApi.getBill,

  payBill:
    customerBillApi.payBill,
};