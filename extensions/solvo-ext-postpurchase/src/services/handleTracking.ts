import { simulateUpsellTracking } from "../utils/simulateUpsell";
import type { InitialData, Order } from "../types/order";

export const handleTracking = async (
  order: Order,
  initialData: InitialData,
  storage: any,
  setIsTracking: (v: boolean) => void,
  setTrackingDone: (v: boolean) => void
) => {
  const newItem = order.lineItems?.[0];
  if (!newItem) return;

  setIsTracking(true);

  // Simulate upsell tracking
  await simulateUpsellTracking({
    newItem,
    orderId: order.referenceId,
    currency: order.currency,
    customerId: order.customerId,
    customerEmail: order.customerEmail,
  });

  // Update storage by adding trackingSent
  await storage.update({ ...initialData, trackingSent: true });

  setIsTracking(false);
  setTrackingDone(true);
};