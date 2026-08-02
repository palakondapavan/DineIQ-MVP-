import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import ConfirmDialog from "./ConfirmDialog";

import {
  ConfirmDialogContext,
} from "./useConfirmDialog";

import type {
  ConfirmOptions,
} from "./types";

interface ProviderProps {
  children: ReactNode;
}

export default function ConfirmDialogProvider({
  children,
}: ProviderProps) {
  const [
    options,
    setOptions,
  ] = useState<ConfirmOptions | null>(
    null
  );

  const resolver =
    useRef<
      ((value: boolean) => void) | null
    >(null);

  const confirm =
    useCallback(
      (
        options: ConfirmOptions
      ) => {
        setOptions(options);

        return new Promise<boolean>(
          (resolve) => {
            resolver.current =
              resolve;
          }
        );
      },
      []
    );

  function close(
    confirmed: boolean
  ) {
    resolver.current?.(confirmed);

    resolver.current = null;

    setOptions(null);
  }

  const value = useMemo(
    () => ({
      confirm,
    }),
    [confirm]
  );

  return (
    <ConfirmDialogContext.Provider
      value={value}
    >
      {children}

      <ConfirmDialog
        open={
          options !== null
        }
        options={options}
        onConfirm={() =>
          close(true)
        }
        onCancel={() =>
          close(false)
        }
      />
    </ConfirmDialogContext.Provider>
  );
}