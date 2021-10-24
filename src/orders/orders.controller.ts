import { Controller, Body, Get, Post, Param, HttpCode } from '@nestjs/common';
import { OrderInput } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @Post('/')
  getAllOrderByCustomerName(@Body('customerName') customerName: string) {
    return this.ordersService.getAllOrderByCustomerName(customerName);
  }

  @Get('/:orderId')
  getOrdersDetail(@Param('orderId') orderId: number) {
    return this.ordersService.getOrdersDetail(orderId);
  }

  @HttpCode(200)
  @Post('/create')
  createOrder(@Body() data: OrderInput) {
    return this.ordersService.createOrder(data);
  }
}
