import { getCookieValue } from "../utils/cookies";
import { cyrb53 } from "../utils/hash";
import {
  CONVERSION_COOKIE,
  DEFAULT_PARTNER_ID,
  OVERRIDEN_PARTNER_ID_COOKIE,
  PRODUCT_VERSION_COOKIE,
  TRACKING_ENDPOINT,
} from "../constants";

import type {
  CustomerInfo,
  LineItem,
  ShopifyCheckout,
} from "../types/";

export async function sendOrderConversionTracking(checkout: ShopifyCheckout) {
  try {
    const clickId = getCookieValue(CONVERSION_COOKIE);
    if (!clickId) {
      console.warn("⛔ No oh_click cookie found. Skipping tracking.");
      return;
    }

    // Read cookie values
    const partnerId =
      getCookieValue(OVERRIDEN_PARTNER_ID_COOKIE) || DEFAULT_PARTNER_ID;
    const productVersion = getCookieValue(PRODUCT_VERSION_COOKIE) || "";

    // Extract checkout data
    const currency = checkout.currency;
    const orderId = checkout.order_id;
    const orderNumber = checkout.order_number;
    const lineItems: LineItem[] = checkout.line_items.map((item) => ({
      sku: item.sku,
      quantity: item.quantity,
      linePrice: item.line_price,
      sellingPlanId: item.selling_plan_id,
    }));

    // Generate a unique order ID in case one is not provided
    let eid = orderId?.toString() || "0";
    if (!eid || eid === "0" || eid === "null" || eid === null) {
      eid = "z" + cyrb53(Date.now().toString(), Math.floor(Math.random() * 999999));
    }

    const totalQuantity = lineItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const avgPayout =
      totalQuantity > 0 ? checkout.total_price / totalQuantity : 0;

    // Simulate dataLayer push
    console.log("[Tracking] 🔁 Simulated dataLayer.push:", {
      event: "payment-success",
      transactionTotal: checkout.total_price / 100,
      transactionId: orderNumber,
    });

    // Simulate gtag
    console.log("[Tracking] 📈 Simulated gtag('conversion'):", {
      send_to: "XXXX",
      value: checkout.subtotal_price / 100,
      currency,
      transaction_id: orderId,
    });

    const customer: CustomerInfo = {
      email: checkout.email,
      firstName: checkout.billing_address.first_name,
      lastName: checkout.billing_address.last_name,
      billingAddress: {
        street: checkout.billing_address.street,
        city: checkout.billing_address.city,
        region: checkout.billing_address.province,
        postalCode: checkout.billing_address.zip,
        country: checkout.billing_address.country_code,
      },
    };


    console.log("[Tracking] 🧾 Enhanced conversion data:", customer);

    for (const item of lineItems) {
      const buyFrom = item.sku ? "payment_page" : "upsell";
      const convCode = item.sellingPlanId ? "subscription" : "payment";
      const avgItemPayout = avgPayout * item.quantity;
      const funnelParam = productVersion ? `&funnel=${productVersion}` : "";

      const trackingUrl = `${TRACKING_ENDPOINT}/${partnerId}/d/ftd?clid=${clickId}&payout=${avgItemPayout}&quantity=${item.quantity}&buy_from=${buyFrom}&currency=${currency}&code=${item.sku}&conv_code=${convCode}&original_price=${item.linePrice}&order_eid=${eid}${funnelParam}&extra=${eid}_${item.sku}`;

      try {
        const response = await fetch(trackingUrl);
        const result = await response.text();
        console.log(`[Tracking] ✅ Sent for SKU ${item.sku}:`, result);
      } catch (err) {
        console.error(`[Tracking] ❌ Error for SKU ${item.sku}:`, err);
      }
    }
  } catch (err: any) {
    console.error("[Tracking] ❌ General error:", err.message);
  }
}
