import {
  Tag,
  Banner,
  BlockStack,
  View,
  TextBlock,
  Pressable,
  Popover,
} from "@shopify/ui-extensions-react/checkout";

export function ProductBanner({ message }: { message: string }) {
  return (
    <BlockStack spacing="loose">
      <Banner title="Solvo Global">
        <Pressable
          overlay={
            <Popover>
              <View maxInlineSize={200} padding="base">
                <TextBlock>{message}</TextBlock>
              </View>
            </Popover>
          }
        >
          <Tag>Click for more info</Tag>
        </Pressable>
      </Banner>
    </BlockStack>
  );
}
