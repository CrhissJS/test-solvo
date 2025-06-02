export type LineItem = {
  product: {
    id: number;
    title: string;
    imageUrl?: string;
  };
  quantity: number;
  totalPriceSet: {
    shopMoney: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type Order = {
  referenceId: string;
  currency: string;
  customerId: number;
  customerEmail: string;
  lineItems: LineItem[];
  totalPriceSet: {
    shopMoney: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type InitialData = {
  order?: Order;
  feedback?: string;
  trackingSent?: boolean;
  extensionDone?: boolean
};