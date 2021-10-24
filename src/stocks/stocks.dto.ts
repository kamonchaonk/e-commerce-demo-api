import { IsNotEmpty } from 'class-validator';
import { Products } from 'src/schemas/products.schema';
import { IStocks, Stocks } from 'src/schemas/stocks.schema';

export class StockInput {
  @IsNotEmpty() productId: number;
  @IsNotEmpty() amount: number;
}

class StockProduct {
  products: Array<Products>;
}

export class StockOutput implements IStocks {
  constructor(obj: Stocks & StockProduct) {
    this.stockId = obj.stockId;
    this.productId = obj.productId;
    this.amount = obj.amount;
    this.productName = obj.products[0].productName;
    this.price = obj.products[0].price;
  }

  stockId: number;
  productId: number;
  amount: number;
  productName: string;
  sold: number;
  price: number;
}
