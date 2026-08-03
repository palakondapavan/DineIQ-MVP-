import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface ContextValue {
  open: boolean;

  openSheet: () => void;

  closeSheet: () => void;
}

const BillSheetContext =
  createContext<
    ContextValue | undefined
  >(undefined);

export function BillSheetProvider({
  children,
}: React.PropsWithChildren) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const value = useMemo(
    () => ({
      open,

      openSheet() {
        setOpen(true);
      },

      closeSheet() {
        setOpen(false);
      },
    }),
    [open]
  );

  return (
    <BillSheetContext.Provider
      value={value}
    >
      {children}
    </BillSheetContext.Provider>
  );
}

export function useBillSheet() {
  const context =
    useContext(
      BillSheetContext
    );

  if (!context) {
    throw new Error(
      "useBillSheet must be used inside BillSheetProvider."
    );
  }

  return context;
}