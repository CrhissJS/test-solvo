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
