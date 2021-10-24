import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Order2Products,
  Order2ProductsSchema,
} from 'src/schemas/order2products.schema';
import { Orders, OrdersSchema } from 'src/schemas/orders.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Orders.name, schema: OrdersSchema },
        { name: Order2Products.name, schema: Order2ProductsSchema },
      ],
      'e-commerce',
    ),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
