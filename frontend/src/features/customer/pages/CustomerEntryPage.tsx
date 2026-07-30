import { useParams } from "react-router-dom";

import CustomerForm from "../components/CustomerForm";

export default function CustomerEntryPage() {
  const { tableId = "1" } = useParams();

  return (
    <main className="min-h-screen bg-background">
      <CustomerForm tableId={Number(tableId)} />
    </main>
  );
}