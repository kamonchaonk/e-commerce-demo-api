import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IOrder2Products {
  o2pId: number;
  productId: number;
  orderId: number;
  amount: number;
  price: number;
  total: number;
  productName: string;
}

@Schema({ versionKey: false })
export class Order2Products implements IOrder2Products {
  @Prop() o2pId: number;
  @Prop() productId: number;
  @Prop() orderId: number;
  @Prop() amount: number;
  @Prop() price: number;
  @Prop() total: number;
  @Prop() productName: string;
}

export type Order2ProductsDocument = IOrder2Products & Document;
export const Order2ProductsSchema =
  SchemaFactory.createForClass(Order2Products);
