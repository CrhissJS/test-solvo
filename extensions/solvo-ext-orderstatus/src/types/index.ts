export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  billingAddress: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
}

export interface LineItem {
  sku: string;
  quantity: number;
  linePrice: number; // antes: price
  sellingPlanId?: string;
}

export interface OrderInfo {
  id: string;
  number: string;
  currency: string;
  totalPrice: number;
  subtotalPrice: number;
  lineItems: LineItem[];
  customer: CustomerInfo;
}

export interface ShopifyCheckout {
  order_id: string;
  order_number: string;
  subtotal_price: number;
  total_price: number;
  currency: string;
  email: string;
  billing_address: {
    first_name: string;
    last_name: string;
    street: string;
    city: string;
    province: string;
    zip: string;
    country_code: string;
  };
  line_items: {
    sku: string;
    quantity: number;
    line_price: number;
    selling_plan_id?: string;
  }[];
}
