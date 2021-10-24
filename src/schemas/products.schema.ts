import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IProducts {
  productId: number;
  productName: string;
  price: number;
  description: string;
}

@Schema({ versionKey: false })
export class Products implements IProducts {
  @Prop() productId: number;
  @Prop() productName: string;
  @Prop() price: number;
  @Prop() description: string;
}

export type ProductsDocument = IProducts & Document;
export const ProductsSchema = SchemaFactory.createForClass(Products);
