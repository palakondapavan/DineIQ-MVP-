import { createContext, useContext } from "react";

import type {
  ConfirmDialogContextType,
} from "./types";

export const ConfirmDialogContext =
  createContext<
    ConfirmDialogContextType | undefined
  >(undefined);

export function useConfirmDialog() {
  const context = useContext(
    ConfirmDialogContext
  );

  if (!context) {
    throw new Error(
      "useConfirmDialog must be used inside ConfirmDialogProvider."
    );
  }

  return context.confirm;
}