import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { ProductsDocument, Products } from 'src/schemas/products.schema';
import { ProductInput, ProductOutput } from './products.dto';
import { Stocks, StocksDocument } from 'src/schemas/stocks.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
    @InjectModel(Stocks.name) private stocksModel: Model<StocksDocument>,
  ) {}

  async getAllProduct() {
    const result = await this.productsModel.find().exec();

    const returnResult = result.map((res) => {
      const product = new ProductOutput(res);
      return product;
    });

    return returnResult;
  }

  async getProductById(productId: number) {
    const result = await this.productsModel
      .findOne({ productId: productId })
      .exec();

    if (result) {
      const returnResult = new ProductOutput(result);
      return returnResult;
    }
  }

  async updateProduct(productId: number, data: ProductInput) {
    const result = await this.stocksModel
      .findOne({ productId: productId })
      .exec();

    await this.productsModel
      .updateOne(
        { productId: productId },
        {
          productName: data.productName,
          price: data.price,
          description: data.description,
        },
      )
      .exec();

    await this.stocksModel
      .updateOne({ productId: productId }, { amount: result.amount ?? 0 })
      .exec();
  }

  async deleteProduct(productId: number) {
    await this.productsModel.deleteOne({ productId });
    await this.stocksModel.deleteOne({ productId });

    return this.getAllProduct();
  }

  async createProduct(data: ProductInput) {
    const productId = await this.getNextProductId();
    const stockId = await this.getNextStockId();
    await this.productsModel.insertMany({
      productId,
      productName: data.productName,
      price: data.price,
      description: data.description,
    });

    await this.stocksModel.insertMany({
      productId,
      stockId,
      amount: data.amount ?? 0,
    });
  }

  async getNextProductId() {
    const maxId = await this.productsModel
      .aggregate([
        { $group: { _id: null, maxQuantity: { $max: '$productId' } } },
      ])
      .exec();

    if (maxId.length === 0) {
      return 1;
    } else {
      return (maxId[0].maxQuantity as number) + 1;
    }
  }

  async getNextStockId() {
    const maxId = await this.stocksModel
      .aggregate([{ $group: { _id: null, maxQuantity: { $max: '$stockId' } } }])
      .exec();

    if (maxId.length === 0) {
      return 1;
    } else {
      return (maxId[0].maxQuantity as number) + 1;
    }
  }
}
