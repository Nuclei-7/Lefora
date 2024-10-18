import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const paypalID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const PayPalButton = ({ totalAmount }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount.toFixed(2), // Total amount in USD
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("Payment successful: ", details);
            // Handle the order confirmation here (save to the database, etc.)
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
