import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IStocks {
  stockId: number;
  productId: number;
  amount: number;
}

@Schema({ versionKey: false })
export class Stocks implements IStocks {
  @Prop() stockId: number;
  @Prop() productId: number;
  @Prop() amount: number;
}

export type StocksDocument = IStocks & Document;
export const StocksSchema = SchemaFactory.createForClass(Stocks);
