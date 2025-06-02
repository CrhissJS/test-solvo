import { Image, Layout } from "@shopify/post-purchase-ui-extensions-react";
import { SOLVO_LOGO_URL } from "../constants";

export function SolvoLogo() {
  return (
    <Layout
      media={[
        { viewportSize: "small", sizes: [1, 0, 1], maxInlineSize: 0.7 },
        { viewportSize: "medium", sizes: [400, 0, 1], maxInlineSize: 360 },
        { viewportSize: "large", sizes: [420, 38, 240] },
      ]}
    >
      <Image
        source={SOLVO_LOGO_URL}
        description="Solvo Global logo"
        aspectRatio={10}
      />
    </Layout>
  );
}
