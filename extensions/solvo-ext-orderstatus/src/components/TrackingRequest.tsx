import {
  BlockStack,
  Banner,
  Spinner,
  TextBlock,
} from "@shopify/ui-extensions-react/customer-account";

import { useEffect, useState } from "react";
import { sendOrderConversionTracking } from "../services/tracking";
import type { ShopifyCheckout } from "../types";

export function TrackingRequest() {
  const [isTracking, setIsTracking] = useState(true);

  const mockCheckout: ShopifyCheckout = {
    order_id: "123456",
    order_number: "A-0001",
    subtotal_price: 25000,
    total_price: 27000,
    currency: "USD",
    email: "test@example.com",
    billing_address: {
      first_name: "John",
      last_name: "Doe",
      street: "123 Main St",
      city: "New York",
      province: "NY",
      zip: "10001",
      country_code: "US",
    },
    line_items: [
      {
        sku: "ABC-123",
        quantity: 1,
        line_price: 27000,
        selling_plan_id: undefined,
      },
    ],
  };

  useEffect(() => {
    sendOrderConversionTracking(mockCheckout).finally(() =>
      setTimeout(() => setIsTracking(false), 3000)
    );
  }, []);

  return (
    <Banner status={isTracking ? "info" : "success"}>
      <BlockStack spacing="tight">
        {isTracking ? (
          <>
            <BlockStack inlineAlignment={"center"} spacing="extraLoose">
              <TextBlock>Sending purchase data to Solvo Analytics...</TextBlock>
              <Spinner />
            </BlockStack>
          </>
        ) : (
          <TextBlock>
            📦 Purchase data has been tracked to help improve your future
            experiences.
          </TextBlock>
        )}
      </BlockStack>
    </Banner>
  );
}
