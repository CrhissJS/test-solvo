import {
  reactExtension,
  useApi,
  useCartLineTarget,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";
import { fetchProductMetafield } from "./services/productMetafield";
import { ProductBanner } from "./components/ProductBanner";

export const thankYouBlock = reactExtension(
  "purchase.thank-you.cart-line-item.render-after",
  () => <Extension />
);

export const checkoutBlock = reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <Extension />
);

function Extension() {
  const { query } = useApi();
  const target = useCartLineTarget();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!target?.merchandise?.product?.id) return;

    fetchProductMetafield(target.merchandise.product.id, query).then(
      setMessage
    );
  }, [target]);

  if (!message) return null;

  return <ProductBanner message={message} />;
}
