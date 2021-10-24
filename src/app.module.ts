import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { StocksModule } from './stocks/stocks.module';
import { DbConnectorModule } from './db-connector/db-connector.module';

@Module({
  imports: [ProductsModule, OrdersModule, StocksModule, DbConnectorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
