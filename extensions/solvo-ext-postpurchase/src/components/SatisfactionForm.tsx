import {
  BlockStack,
  CalloutBanner,
  Button,
  TextBlock,
  InlineStack,
  useExtensionInput,
  Layout,
} from "@shopify/post-purchase-ui-extensions-react";
import type { PostPurchaseRenderApi } from "@shopify/post-purchase-ui-extensions-react";
import { useState } from "react";

type InitialData = {
  feedback?: string;
};

export function SatisfactionForm() {
  const { storage } = useExtensionInput() as PostPurchaseRenderApi;
  const initialData = storage.initialData as InitialData;
  const [localFeedback, setLocalFeedback] = useState(initialData.feedback);

  // Show feedback already submitted
  if (localFeedback) {
    return (
      <CalloutBanner title="Thanks for your feedback!">
        <TextBlock>You selected: {localFeedback}</TextBlock>
      </CalloutBanner>
    );
  }

  // Handle feedback selection
  const handleFeedback = async (value: string) => {
    await storage.update({ ...initialData, feedback: value });
    setLocalFeedback(value);
  };

  return (
    <Layout
      media={[
        { viewportSize: "small", sizes: [1, 0, 1] },
        { viewportSize: "medium", sizes: [1, 0, 1] },
      ]}
    >
      <BlockStack spacing="loose" alignment="center">
        <TextBlock>
          📝 Tell us how did you feel about the purchase process!
        </TextBlock>
        <InlineStack spacing="loose">
          <Button plain onPress={() => handleFeedback("😞 bad")}>
            😞 Not satisfied
          </Button>
          <Button plain onPress={() => handleFeedback("😐 neutral")}>
            😐 It was okay
          </Button>
          <Button plain onPress={() => handleFeedback("😃 good")}>
            😃 Loved it!
          </Button>
        </InlineStack>
      </BlockStack>
    </Layout>
  );
}
