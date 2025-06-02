import {
  Banner,
  BlockStack,
  Button,
  Divider,
  Link,
  TextBlock,
  useApi,
} from "@shopify/ui-extensions-react/customer-account";
import { TrackingRequest } from "./TrackingRequest";

export function OrderStatusBanner() {
  const { i18n } = useApi();

  return (
    <BlockStack spacing="loose">
      <Banner status="success">
        <TextBlock>🎉 {i18n.translate("earnPoints")}</TextBlock>
        <Link to="/" appearance="monochrome">
          {i18n.translate("tellUsHow")}
        </Link>
      </Banner>

      <Divider />

      <TrackingRequest />
    </BlockStack>
  );
}
