import { getCookieValue } from './cookies';
import { TRACKING_URL, PARTNER_ID } from '../constants';

export function sendTrackingRequest({
  lineItem,
  orderId,
  currency,
  email,
  buyFrom = 'payment_page'
}) {
  // Get 'oh_click' cookie value
  const ohClick = getCookieValue('oh_click');
  
  console.log("✅ Cookies are active and working");
  console.log("🧪 Cookie 'oh_click:'", ohClick);
  
  // AJAX request to simulate tracking
  const request = new XMLHttpRequest();
  
  // Build the tracking URL
  const url = `${TRACKING_URL}${PARTNER_ID}/d/ftd` +
    `?clid=${ohClick}` +
    `&quantity=${lineItem.quantity}` +
    `&buy_from=${buyFrom}` +
    `&code=${lineItem.variant?.sku}` +
    `&conv_code=payment` +
    `&currency=${currency}` +
    `&order_eid=${orderId}` +
    `&original_price=${lineItem.finalLinePrice}` +
    `&email=${email}`;

  request.open('GET', url);

  // Show tracking sending data status
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log(`Tracking Request: ${request.status} - ${request.responseText}`);
    }
  };

  // Send the request
  request.send();
};