import {
  extend,
  render,
  BlockStack,
  Button,
  CalloutBanner,
  Layout,
  Separator,
  useExtensionInput,
  TextBlock,
} from "@shopify/post-purchase-ui-extensions-react";
import type { PostPurchaseRenderApi } from "@shopify/post-purchase-ui-extensions-react";

import { useState } from "react";
import type { InitialData, Order } from "./types/order";
import { TrackingRequest } from "./components/TrackingRequest";
import { SatisfactionForm } from "./components/SatisfactionForm";
import { SolvoLogo } from "./components/SolvoLogo";
import { OrderDetails } from "./components/OrderDetails";
import { handleTracking } from "./services/handleTracking";

// Configure the Post Purchase extension 'ShouldRender' method
extend(
  "Checkout::PostPurchase::ShouldRender",
  async ({ storage, inputData }) => {
    const initialState = await getRenderData();
    const order = inputData?.initialPurchase;

    if (order) {
      await storage.update({ ...initialState, order });

      return { render: true };
    }

    return { render: false };
  }
);

async function getRenderData() {
  return { couldBe: "anything" };
}

// Configure the Post Purchase extension 'Render' method
render("Checkout::PostPurchase::Render", () => <App />);

function App() {
  const { storage } = useExtensionInput() as PostPurchaseRenderApi; // Destructure the storage to use it to get the initial data of the order
  const initialData = storage.initialData as InitialData;

  const [isTracking, setIsTracking] = useState(false);
  const [trackingDone, setTrackingDone] = useState(initialData.trackingSent);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Mock order
  const order: Order = initialData.order ?? {
    referenceId: "mock-order-123",
    currency: "USD",
    customerId: 1,
    customerEmail: "mock@example.com",
    lineItems: [
      {
        product: { id: 1, title: "Mock Product" },
        quantity: 1,
        totalPriceSet: {
          shopMoney: { amount: "9.99", currencyCode: "USD" },
        },
      },
    ],
    totalPriceSet: {
      shopMoney: { amount: "9.99", currencyCode: "USD" },
    },
  };

  if (initialData.extensionDone || isRedirecting) {
    return null;
  }

  if (!initialData.order) return <p>Loading...</p>;

  return (
    <BlockStack spacing="loose">
      {/* Solvo Logo */}
      <SolvoLogo />

      {/* Banner */}
      <CalloutBanner title="Thanks for your purchase and support!">
        📦 Our delivery team will be in touch with you soon. In parallel, we are
        following up on your order after we have sent the information....
        <TextBlock appearance="warning">
          Estimated delivery: 3-5 business days 📦
        </TextBlock>
      </CalloutBanner>

      <Layout
        media={[
          { viewportSize: "small", sizes: [1, 30, 1] },
          { viewportSize: "medium", sizes: [300, 30, 0.5] },
          { viewportSize: "large", sizes: [600, 10, 5] },
        ]}
      >
        {/* Order details */}
        <OrderDetails order={order} />

        <Separator />

        {/* Parrallel tracking request */}
        <TrackingRequest order={order} />

        {/* Actions - tracking and redirect */}
        <BlockStack alignment="center" spacing="xloose">
          {!trackingDone ? (
            <Button
              loading={isTracking}
              onPress={() =>
                handleTracking(
                  order,
                  initialData,
                  storage,
                  setIsTracking,
                  setTrackingDone
                )
              }
            >
              Send Upsell Tracking
            </Button>
          ) : (
            <CalloutBanner title="Upsell tracking already sent ✅" />
          )}

          <Button
            onPress={async () => {
              await storage.update({ ...initialData, extensionDone: true });

              setIsRedirecting(true);
            }}
          >
            {isRedirecting ? "Redirecting..." : "Continue shopping"}
          </Button>
        </BlockStack>
      </Layout>

      <Separator />

      <SatisfactionForm />
    </BlockStack>
  );
}
