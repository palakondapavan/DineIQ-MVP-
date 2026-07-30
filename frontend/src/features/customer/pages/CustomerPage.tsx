import { useParams } from "react-router-dom";

import CustomerForm from "../components/CustomerForm";

export default function CustomerPage() {
  const { tableId } = useParams();

  if (!tableId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Invalid table.
      </div>
    );
  }

  return (
    <CustomerForm tableId={Number(tableId)} />
  );
}