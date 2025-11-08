import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
  const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // a dónde redirigir cuando el pago se complete
            return_url: "http://127.0.0.1:5000/",
        },
        });

        if (error) {
        console.error(error.message);
        alert(error.message);
        }
    };

    return (
        <form className="flex flex-col py-3 " onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>
                Pagar
            </button>
        </form>
    )
}
