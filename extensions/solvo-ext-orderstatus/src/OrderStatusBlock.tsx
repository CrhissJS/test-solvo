import { reactExtension } from "@shopify/ui-extensions-react/customer-account";
import { OrderStatusBanner } from "./components/OrderStatusBanner";

export default reactExtension(
  "customer-account.order-status.block.render",
  () => <OrderStatusBanner />
);
