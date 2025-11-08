import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { StripeProvider } from "./StripeProvider";
import { payProcess } from "../../../services/pay";


export default function Stripe() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


 const handlePayClick = async () => {
    console.log("pagar");
    setLoading(true);
    console.log("Proceses pay");
    try {
      const res = await payProcess([
        { id: "5a435630-85d3-49f2-9c8c-13d544624e81", quantity: 2 },
        { id: "648c0f3f-81ad-4b26-a948-9f5e8b15078a", quantity: 1 },
      ]);
      console.log("Res pay", res);
      setClientSecret(res.clientSecret);
    } catch (err) {
      console.error(err);
      alert("Error creando el pago");
    }
    setLoading(false);
  };


  if (clientSecret) {
    return (
      <StripeProvider clientSecret={clientSecret}>
        <CheckoutForm />
      </StripeProvider>
    );
  }

 return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={handlePayClick} disabled={loading}>
        {loading ? "Preparando pago..." : "Pagar"}
      </button>
    </div>
  );
}
