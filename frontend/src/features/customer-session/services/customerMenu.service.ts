import { customerMenuApi } from "../api/customerMenu.api";

export const customerMenuService = {
  getMenu() {
    return customerMenuApi.getMenu();
  },
};