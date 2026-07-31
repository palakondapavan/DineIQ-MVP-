import { useParams } from "react-router-dom";

import LoadingSpinner from "@/shared/components/ui/LoadingSpinner";

import { useSessionBootstrap } from "../hooks/useSessionBootstrap";

export default function SessionBootstrapPage() {
  const { tableId } = useParams();

  const { loading } = useSessionBootstrap(
    Number(tableId)
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return null;
}