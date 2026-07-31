import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sessionStorageUtil } from "@/shared/utils";

import { publicTableService } from "../services/publicTable.service";
import { sessionBootstrapService } from "../services/sessionBootstrap.service";

export function useSessionBootstrap(tableId: number) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        /**
         * STEP 1
         * Resume local session if it exists.
         */
        const storedSession = sessionStorageUtil.get();

        if (storedSession) {
          if (storedSession.tableId !== tableId) {
            sessionStorageUtil.clear();
          } else {
            const session =
              await sessionBootstrapService.validate(
                storedSession.sessionId
              );

            if (
              sessionBootstrapService.hasValidSession(session)
            ) {
              navigate(
                `/customer/session/${storedSession.sessionId}`,
                {
                  replace: true,
                }
              );

              return;
            }

            sessionStorageUtil.clear();
          }
        }

        /**
         * STEP 2
         * No valid session.
         * Check current table status.
         */
        const table =
          await publicTableService.getTable(tableId);

        if (
          publicTableService.isAvailable(table.status)
        ) {
          navigate(`/table/${tableId}/request`, {
            replace: true,
          });

          return;
        }

        if (
          publicTableService.isOccupied(table.status)
        ) {
          navigate(`/table/${tableId}/resume`, {
            replace: true,
          });

          return;
        }

        if (
          publicTableService.isPending(table.status)
        ) {
          navigate(`/table/${tableId}/pending`, {
            replace: true,
          });

          return;
        }

        /**
         * Fallback
         */
        navigate(`/table/${tableId}/request`, {
          replace: true,
        });
      } catch (error) {
        console.error(
          "Session bootstrap failed:",
          error
        );

        sessionStorageUtil.clear();

        navigate(`/table/${tableId}/request`, {
          replace: true,
        });
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [navigate, tableId]);

  return {
    loading,
  };
}