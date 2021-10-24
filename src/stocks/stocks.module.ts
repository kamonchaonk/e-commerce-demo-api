import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Order2Products,
  Order2ProductsSchema,
} from 'src/schemas/order2products.schema';
import { Products, ProductsSchema } from 'src/schemas/products.schema';
import { Stocks, StocksSchema } from 'src/schemas/stocks.schema';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Products.name, schema: ProductsSchema },
        { name: Stocks.name, schema: StocksSchema },
        { name: Order2Products.name, schema: Order2ProductsSchema },
      ],
      'e-commerce',
    ),
  ],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
