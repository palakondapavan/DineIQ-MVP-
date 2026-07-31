import { sessionBootstrapApi } from "../api/sessionBootstrap.api";

export const sessionBootstrapService = {
  async validate(sessionId: string) {
    try {
      return await sessionBootstrapApi.getSession(sessionId);
    } catch {
      return null;
    }
  },

  hasValidSession(session: unknown): boolean {
    return session !== null;
  },
};