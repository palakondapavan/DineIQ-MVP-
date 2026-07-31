import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { sessionStorageUtil } from "@/shared/utils";

import { resumeSessionService } from "../services/resumeSession.service";

const schema = z.object({
  customer_mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
});

type ResumeSessionFormData = z.infer<typeof schema>;

export function useResumeSession(tableId: number) {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState,
  } = useForm<ResumeSessionFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError("");

    const session =
      await resumeSessionService.resume({
        table_id: tableId,
        customer_mobile: data.customer_mobile,
      });

    if (!session) {
      setServerError(
        "No active session found for this mobile number."
      );

      return;
    }

    sessionStorageUtil.save({
      sessionId: String(session.session_id),
      tableId: session.table_id,
    });

    navigate(
      `/customer/session/${session.session_id}`,
      {
        replace: true,
      }
    );
  });

  return {
    register,
    onSubmit,
    formState,
    isLoading: formState.isSubmitting,
    serverError,
  };
}