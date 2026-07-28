import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTableRequest } from "@/hooks/useTableRequest";

interface WelcomeFormProps {
  tableId: number;
}

export default function WelcomeForm({ tableId }: WelcomeFormProps) {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

  const { mutate, isPending } = useTableRequest();

  const handleContinue = () => {
    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!customerMobile.trim()) {
      toast.error("Please enter your mobile number");
      return;
    }

    mutate(
      {
        tableId,
        request: {
          customer_name: customerName,
          customer_mobile: customerMobile,
        },
      },
      {
        onSuccess: (data) => {
          localStorage.setItem(
            "tableRequest",
            JSON.stringify(data)
          );

          toast.success("Request sent successfully");

          navigate(`/menu/${tableId}`);
        },

        onError: (error: any) => {
          toast.error(
            error?.response?.data?.detail ??
              "Failed to send request"
          );
        },
      }
    );
  };

  return (
    <div className="mt-10 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>

        <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
          <User size={18} className="mr-3 text-slate-400" />

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border-none bg-transparent outline-none"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Mobile Number
        </label>

        <div className="flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
          <Phone size={18} className="mr-3 text-slate-400" />

          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full border-none bg-transparent outline-none"
            value={customerMobile}
            onChange={(e) =>
              setCustomerMobile(e.target.value)
            }
          />
        </div>
      </div>

      <Button
        className="h-14 w-full rounded-xl text-base"
        onClick={handleContinue}
        disabled={isPending}
      >
        {isPending ? "Please wait..." : "Continue"}
      </Button>
    </div>
  );
}