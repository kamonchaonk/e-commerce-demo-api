import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stocks, StocksDocument } from 'src/schemas/stocks.schema';
import { StockInput, StockOutput } from './stocks.dto';
import {
  Order2Products,
  Order2ProductsDocument,
} from 'src/schemas/order2products.schema';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(Stocks.name) private stocksModel: Model<StocksDocument>,
    @InjectModel(Order2Products.name)
    private order2ProductsModel: Model<Order2ProductsDocument>,
  ) {}

  async getAllStocks() {
    const currentProduct = await this.order2ProductsModel.aggregate([
      { $group: { _id: '$productId', current: { $sum: '$amount' } } },
    ]);

    const result = await this.stocksModel
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: 'productId',
            as: 'products',
          },
        },
      ])
      .exec();

    const returnResult = result.map((res) => {
      const stock = new StockOutput(res);
      const found = currentProduct.find((item) => item._id === stock.productId);

      stock.sold = found ? found.current : 0;
      stock.amount = found ? stock.amount - found.current : stock.amount;

      return stock;
    });

    return returnResult;
  }

  async updateStock(stocksId: number, data: StockInput) {
    await this.stocksModel
      .updateOne({ stocksId: stocksId }, { amount: data.amount })
      .exec();
  }
}
