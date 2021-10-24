import { IsNotEmpty, IsOptional } from 'class-validator';
import { IProducts, Products } from '../schemas/products.schema';

export class ProductInput {
  @IsNotEmpty() productName: string;
  @IsNotEmpty() price: number;
  @IsOptional() description: string;
  @IsOptional() amount: number;
}

export class ProductOutput implements IProducts {
  constructor(obj: Products) {
    this.description = obj.description;
    this.price = obj.price;
    this.productId = obj.productId;
    this.productName = obj.productName;
  }
  productId: number;
  productName: string;
  price: number;
  description: string;
  sold: number;
}
