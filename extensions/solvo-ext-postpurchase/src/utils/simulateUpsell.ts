import { getCookieValue } from './cookies';
import { TRACKING_URL, PARTNER_ID } from '../constants';

export async function simulateUpsellTracking({
  newItem,
  orderId,
  currency,
  customerId,
  customerEmail,
  productVersion = '',
}: {
  newItem: any;
  orderId: string;
  currency: string;
  customerId: number;
  customerEmail: string;
  productVersion?: string;
}) {
  console.log("🚀 Simulating Upsell Tracking...");

  const funnelParam = productVersion ? `&funnel=${productVersion}` : '';

  // Get 'oh_click' cookie value
  const ohClick = getCookieValue('oh_click');

  // Build the tracking URL
  const url = `${TRACKING_URL}${PARTNER_ID}/d/ftd` +
    `?clid=${ohClick}` +
    `&payout=${newItem.price?.amount || 0}`+
    `&quantity=${newItem.quantity || 1}` +
    `&buy_from=upsell` +
    `&code=${newItem.variant?.sku || ''}` +
    `&conv_code=payment` +
    `&currency=${currency}` +
    `&order_eid=${orderId}` +
    funnelParam;

  // Promise to simulate a delay as if it was a real request
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // AJAX request to simulate tracking
  const request = new XMLHttpRequest();

  request.open('GET', url);

  // Tracking parallel request
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log(`Tracking parallel request: ${request.status} - ${request.responseText}`);
      console.log("📦 Product:", newItem.title || "Unnamed");
      console.log("📧 Customer ID:", customerId);
      console.log("📧 Customer Email:", customerEmail);
      console.log("💰 Currency:", currency);
      console.log("🆔 Order ID:", orderId);
      console.log("✅ Tracking simulated for upsell product with dummy data.");
    }
  };

  // Send the request
  request.send();
};