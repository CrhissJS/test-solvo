import { PRODUCT_METAFIELD_NAMESPACE, PRODUCT_METAFIELD_KEY } from "../constants";
import type { ProductMetafieldResponse } from "../types/product";

export async function fetchProductMetafield(
  productId: string,
  query: <T>(q: string) => Promise<{ data?: T; errors?: any }>
): Promise<string | null> {
  const gql = `
    {
      product(id: "${productId}") {
        metafield(namespace: "${PRODUCT_METAFIELD_NAMESPACE}", key: "${PRODUCT_METAFIELD_KEY}") {
          value
        }
      }
    }
  `;

  try {
    const result = await query<ProductMetafieldResponse>(gql);

    return result?.data?.product?.metafield?.value ?? null;
  } catch (err) {
    console.warn("🛑 Error fetching metafield:", err);
    return null;
  }
}
