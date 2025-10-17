export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  capSize?: string;
  length?: string;
  density?: string;
  color?: string;
  texture?: string;
  lace?: string;
  styling?: string;
  addOns?: string[];
  partSelection?: string;
  hairline?: string;
}
