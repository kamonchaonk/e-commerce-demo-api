import {
  Controller,
  Body,
  Delete,
  Get,
  Post,
  Put,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ProductInput } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/') getAllProduct() {
    this.productsService.getNextProductId();

    return this.productsService.getAllProduct();
  }

  @Get('/:productId') getProductById(@Param('productId') productId: number) {
    return this.productsService.getProductById(productId);
  }

  @HttpCode(200)
  @Post('/')
  createProduct(@Body() product: ProductInput) {
    return this.productsService.createProduct(product);
  }

  @Put('/:productId') updateProduct(
    @Param('productId') productId: number,
    @Body() product: ProductInput,
  ) {
    return this.productsService.updateProduct(productId, product);
  }

  @Delete('/:productId') deleteProduct(@Param('productId') productId: number) {
    return this.productsService.deleteProduct(productId);
  }
}
