import { IsNotEmpty, IsOptional } from 'class-validator';
import { IOrders, Orders } from 'src/schemas/orders.schema';

export class OrderInput {
  @IsNotEmpty() totalPrice: number;
  @IsOptional() customerName: string;
  @IsNotEmpty() orderProducts: Array<OrderProductInput>;
}

export class OrderOutput implements IOrders {
  constructor(obj: Orders) {
    this.orderId = obj.orderId;
    this.totalPrice = obj.totalPrice;
    this.customerName = obj.customerName;
    this.createDate = obj.createDate;
  }

  orderId: number;
  totalPrice: number;
  customerName: string;
  createDate: Date;
}

class OrderProductInput {
  @IsNotEmpty() productId: number;
  @IsNotEmpty() amount: number;
  @IsNotEmpty() price: number;
  @IsNotEmpty() total: number;
  @IsNotEmpty() productName: string;
}
