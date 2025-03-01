export class CartItemModel {
  id: number;
  product_name: string;
  product_price_1: string;
  product_quantity: string;
  product_feature_photo: string;
  product_id: string;
  color: string;
  size: string;
  prices_json: string;

  constructor(
    id: number = 0,
    product_name: string = "",
    product_price_1: string = "",
    product_quantity: string = "",
    product_feature_photo: string = "",
    product_id: string = "",
    color: string = "",
    size: string = "",
    prices_json: string = ""
  ) {
    this.id = id;
    this.product_name = product_name;
    this.product_price_1 = product_price_1;
    this.product_quantity = product_quantity;
    this.product_feature_photo = product_feature_photo;
    this.product_id = product_id;
    this.color = color;
    this.size = size;
    this.prices_json = prices_json;
  }

  // Creates a CartItemModel instance from a JSON object
  static fromJson(json: any): CartItemModel {
    return new CartItemModel(
      json.id ?? 0,
      json.product_name ?? "",
      json.product_price_1 ?? "",
      json.product_quantity ?? "",
      json.product_feature_photo ?? "",
      json.product_id ?? "",
      json.color ?? "",
      json.size ?? "",
      json.prices_json ?? ""
    );
  }

  // Converts the CartItemModel instance into a JSON object
  toJson(): any {
    return {
      id: this.id,
      product_name: this.product_name,
      product_price_1: this.product_price_1,
      product_quantity: this.product_quantity,
      product_feature_photo: this.product_feature_photo,
      product_id: this.product_id,
      color: this.color,
      size: this.size,
      prices_json: this.prices_json,
    };
  }

  // Update the product quantity
  updateQuantity(newQuantity: string): void {
    this.product_quantity = newQuantity;
  }

  // Optionally, calculate the total price for this item if values are numeric
  totalPrice(): number {
    const price = parseFloat(this.product_price_1) || 0;
    const quantity = parseFloat(this.product_quantity) || 0;
    return price * quantity;
  }
}
