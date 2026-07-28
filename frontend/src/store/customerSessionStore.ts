import { create } from "zustand";

interface CustomerSessionState {
  sessionId: number | null;
  tableId: number | null;
  restaurantId: number | null;
  sessionToken: string | null;

  setSession: (
    sessionId: number,
    tableId: number,
    restaurantId: number,
    sessionToken: string
  ) => void;

  clearSession: () => void;
}

export const useCustomerSessionStore =
  create<CustomerSessionState>((set) => ({
    sessionId: null,
    tableId: null,
    restaurantId: null,
    sessionToken: null,

    setSession: (
      sessionId,
      tableId,
      restaurantId,
      sessionToken
    ) =>
      set({
        sessionId,
        tableId,
        restaurantId,
        sessionToken,
      }),

    clearSession: () =>
      set({
        sessionId: null,
        tableId: null,
        restaurantId: null,
        sessionToken: null,
      }),
  }));