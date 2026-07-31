import { publicTableApi } from "../api/publicTable.api";

export const publicTableService = {
  async getTable(tableId: number) {
    return publicTableApi.get(tableId);
  },

  isAvailable(status: string) {
    return status === "AVAILABLE";
  },

  isOccupied(status: string) {
    return status === "OCCUPIED";
  },

  isPending(status: string) {
    return status === "PENDING";
  },
};