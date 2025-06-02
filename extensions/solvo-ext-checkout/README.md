# Checkout & Thank You Extension

This extension displays custom messages for each product based on **metafields** from Shopify’s Product API. It appears both in:

- **Checkout Page**
- **Thank You Page**

---

## 🎯 Use Case

Merchants may want to show custom tags (like "eco-friendly", "limited edition", etc.) per product during checkout.

### Example:

```json
Metafield:
Namespace: "custom"
Key: "productInfoMessage"
Value: "Limited offer! 50% Discount"
```

### 🛠️ Required Setup for Metafields

To properly use this extension, follow these steps in your Shopify Admin:

1. Create a new Metafield definition:

- Go to Settings → Custom data → Products → Add definition
- Name: Product Info Message
- Namespace and key: custom.productInfoMessage
- Type: Single line text

2. Enable Storefront API access for this definition:

- While editing the metafield definition, scroll to the Access section
  -Ensure "Storefronts" access is enabled

3. Assign the message per product:

- Go to Products → Select a product
- Scroll to Metafields section at the bottom
- Enter your custom message under Product Info Message

This value will now appear dynamically in the checkout and thank-you page as a contextual message.

---

## 🖼️ Visual Demo

-- Checkout Page displaying custom messages under each product --

![Checkout Page Video](../../docs/assets/checkout.gif)

---

## ⚙️ Folder Structure

```
solvo-ext-checkout/src/
├── components/
│   ├── ProductBanner.tsx
├── services/
│   ├── productMetafield.ts
├── constants/
│   ├── index.ts
├── types/
│   ├── product.ts
└── Checkout.tsx
```

### Modular Features

- `ProductBanner.tsx`: Banner with popover for messages
- `productMetafield.ts`: GraphQL query service
- `constants/index.ts`: Centralized keys
- `types/product.ts`: Centralized types
- `Checkout.tsx`: Entry point with `reactExtension(...)`

---

## 💡 Notes

- Uses `Popover` to keep UI minimal and clean
- Built fully with `useCartLineTarget()` and `useApi()` from Shopify SDK
