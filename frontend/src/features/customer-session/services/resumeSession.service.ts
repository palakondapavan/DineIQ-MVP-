import { AxiosError } from "axios";

import {
  resumeSessionApi,
  type ResumeSessionRequest,
  type ResumeSessionResponse,
} from "../api/resumeSession.api";

export const resumeSessionService = {
  async resume(
    payload: ResumeSessionRequest
  ): Promise<ResumeSessionResponse> {
    try {
      return await resumeSessionApi.resume(payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Resume session failed:",
          error.response?.data ?? error.message
        );
      } else {
        console.error("Resume session failed:", error);
      }

      throw error;
    }
  },
};