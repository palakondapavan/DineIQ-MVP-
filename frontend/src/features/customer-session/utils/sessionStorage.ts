const SESSION_STORAGE_KEY = "customer_session";

export interface StoredCustomerSession {
  /**
   * Request created after POST /table-requests
   */
  requestId: number | null;

  /**
   * Created after waiter accepts
   * and Resume Session succeeds.
   */
  sessionId: number | null;

  /**
   * Current table.
   */
  tableId: number;

  /**
   * Used for Resume Session API.
   */
  customerMobile: string;
}

export const sessionStorage = {
  save(session: StoredCustomerSession): void {
    localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(session)
    );
  },

  load(): StoredCustomerSession | null {
    const data = localStorage.getItem(
      SESSION_STORAGE_KEY
    );

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(
        data
      ) as StoredCustomerSession;
    } catch {
      this.clear();
      return null;
    }
  },

  update(
    values: Partial<StoredCustomerSession>
  ): void {
    const existing = this.load();

    if (!existing) {
      return;
    }

    this.save({
      ...existing,
      ...values,
    });
  },

  clear(): void {
    localStorage.removeItem(
      SESSION_STORAGE_KEY
    );
  },

  hasSession(): boolean {
    const session = this.load();

    return (
      session !== null &&
      session.sessionId !== null
    );
  },

  hasPendingRequest(): boolean {
    const session = this.load();

    return (
      session !== null &&
      session.requestId !== null &&
      session.sessionId === null
    );
  },
};