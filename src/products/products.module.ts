import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema, Products } from '../schemas/products.schema';
import { Stocks, StocksSchema } from 'src/schemas/stocks.schema';
import {
  Order2Products,
  Order2ProductsSchema,
} from 'src/schemas/order2products.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Products.name, schema: ProductsSchema },
        { name: Stocks.name, schema: StocksSchema },
      ],
      'e-commerce',
    ),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
