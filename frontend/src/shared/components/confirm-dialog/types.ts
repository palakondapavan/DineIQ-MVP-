export type ConfirmVariant =
  | "danger"
  | "warning"
  | "success"
  | "default";

export interface ConfirmOptions {
  title: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  variant?: ConfirmVariant;
}

export interface ConfirmDialogContextType {
  confirm: (
    options: ConfirmOptions
  ) => Promise<boolean>;
}