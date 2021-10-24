import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { StockInput } from './stocks.dto';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}
  @Get('/') getAllStocks() {
    return this.stocksService.getAllStocks();
  }

  @Put('/:stockId')
  updateStock(@Param('stockId') stocksId: number, @Body() data: StockInput) {
    return this.stocksService.updateStock(stocksId, data);
  }
}
