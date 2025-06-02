import {
  BlockStack,
  Heading,
  Layout,
  TextBlock,
  TextContainer,
  Tiles,
  InlineStack,
} from "@shopify/post-purchase-ui-extensions-react";

type Props = {
  order: {
    referenceId: string;
    customerId: number;
    totalPriceSet: {
      shopMoney: { amount: string; currencyCode: string };
    };
    lineItems: {
      product: { id: number; title: string };
      quantity: number;
    }[];
  };
};

export function OrderDetails({ order }: Props) {
  return (
    <Layout
      media={[
        { viewportSize: "small", sizes: [1] },
        { viewportSize: "medium", sizes: [1] },
        { viewportSize: "large", sizes: [1, 1] },
      ]}
    >
      <BlockStack spacing="loose" alignment="center">
        <TextContainer>
          <Heading>✅ Your order has been placed</Heading>

          <BlockStack spacing="tight" alignment="center">
            <TextBlock>Order ID: {order.referenceId}</TextBlock>
            <TextBlock>Customer ID: {order.customerId}</TextBlock>
          </BlockStack>

          <TextBlock appearance="success">Items</TextBlock>

          <BlockStack spacing="tight">
            {order.lineItems.map((item) => {
              return (
                <Tiles
                  key={item.product.id}
                  spacing="tight"
                  alignment="leading"
                >
                  <TextBlock>
                    {item.product.title} x{item.quantity}
                  </TextBlock>
                </Tiles>
              );
            })}
          </BlockStack>

          <InlineStack alignment="center" spacing="tight">
            <TextBlock appearance="success">Total paid:</TextBlock>
            <TextBlock>
              {order.totalPriceSet.shopMoney.amount}{" "}
              {order.totalPriceSet.shopMoney.currencyCode}
            </TextBlock>
          </InlineStack>
        </TextContainer>
      </BlockStack>
    </Layout>
  );
}
