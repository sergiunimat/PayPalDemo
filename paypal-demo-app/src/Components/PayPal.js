import React, { useRef, useEffect, useState } from "react";
import App from "../App";

function PayPal(props) {
  const paypal = useRef();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("order object", props.finalOrder);
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            // intent Capture -> intent to capture the transaction imediately after purchase no pending
            intent: "CAPTURE",
            purchase_units: [props.finalOrder],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Order is Complete", order);
          setSuccess(true);
        },
        onError: (error) => {
          console.log("Error while processing the order", error);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      {success === true ? (
        <App notification={true} />
      ) : (
        <div ref={paypal}></div>
      )}
    </div>
  );
}

export default PayPal;
