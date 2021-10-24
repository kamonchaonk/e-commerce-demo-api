import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDocument } from 'src/schemas/orders.schema';
import { OrderInput, OrderOutput } from './orders.dto';
import {
  Order2Products,
  Order2ProductsDocument,
} from 'src/schemas/order2products.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>,
    @InjectModel(Order2Products.name)
    private order2ProductsModel: Model<Order2ProductsDocument>,
  ) {}

  async getAllOrderByCustomerName(customerName: string) {
    const result = await this.ordersModel.find({ customerName }).exec();

    const returnResult = result.map((res) => new OrderOutput(res));

    return returnResult;
  }

  async getOrdersDetail(orderId: number) {
    const result = await this.order2ProductsModel.find({ orderId }).exec();
    return result;
  }

  async createOrder(data: OrderInput) {
    const orderId = await this.getNextOrderId();
    const o2pId = await this.getNextOrder2ProductId();

    await this.ordersModel.insertMany({
      orderId,
      totalPrice: data.totalPrice,
      customerName: data.customerName,
      createDate: new Date(),
    });

    await this.order2ProductsModel.insertMany(
      data.orderProducts.map((order, index) => {
        return {
          ...order,
          orderId: orderId,
          o2pId: o2pId + index,
        };
      }),
    );

    return { message: 'success' };
  }

  async getNextOrderId() {
    const maxId = await this.ordersModel
      .aggregate([{ $group: { _id: null, maxQuantity: { $max: '$orderId' } } }])
      .exec();
    if (maxId.length === 0) {
      return 1;
    } else {
      return (maxId[0].maxQuantity as number) + 1;
    }
  }

  async getNextOrder2ProductId() {
    const maxId = await this.order2ProductsModel
      .aggregate([{ $group: { _id: null, maxQuantity: { $max: '$o2pId' } } }])
      .exec();

    if (maxId.length === 0) {
      return 1;
    } else {
      return (maxId[0].maxQuantity as number) + 1;
    }
  }
}
