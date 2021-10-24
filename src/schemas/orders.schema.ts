import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IOrders {
  orderId: number;
  totalPrice: number;
  customerName: string;
  createDate: Date;
}

@Schema({ versionKey: false })
export class Orders implements IOrders {
  @Prop() orderId: number;
  @Prop() totalPrice: number;
  @Prop() customerName: string;
  @Prop() createDate: Date;
}

export type OrdersDocument = IOrders & Document;
export const OrdersSchema = SchemaFactory.createForClass(Orders);
