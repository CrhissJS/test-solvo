import { useEffect } from "react";
import { sendTrackingRequest } from "../utils/tracking";

export function TrackingRequest({ order }) {
  useEffect(() => {
    try {
      if (!order) return;
      const { id: orderId, currency, customer, lineItems } = order;
      const email = customer?.email;

      if (!lineItems || !email) return;

      // Send tracking requests
      lineItems.forEach((lineItem) => {
        sendTrackingRequest({ lineItem, orderId, currency, email });
      });
    } catch (err) {
      console.error("TrackingRequest error:", err);
    }
  }, [order]);

  return <></>;
}
