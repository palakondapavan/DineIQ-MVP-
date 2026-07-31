const STORAGE_KEY = "dineiq.active_session";

export interface StoredSession {
  sessionId: string;
  tableId: number;
}

export const sessionStorageUtil = {
  save(session: StoredSession) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );
  },

  get(): StoredSession | null {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as StoredSession;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  hasSession(): boolean {
    return this.get() !== null;
  },
};