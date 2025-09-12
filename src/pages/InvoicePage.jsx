import { useState } from "react";
import PaymentStep from "../components/PaymentStep";
import InvoiceStep from "../components/InvoiceStep";
import SidebarSummary from "../components/SidebarSummary";

export default function PaymentPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex max-w-6xl mx-auto p-6 gap-6">
      <div className="flex-1 bg-gray-50 p-6 rounded-xl">
        {!selected ? (
          <PaymentStep setSelected={setSelected} />  
        ) : (
          <InvoiceStep payment={selected} />
        )}
      </div>

      <SidebarSummary step={selected ? "invoice" : "payment"} />
    </div>
  );
}
