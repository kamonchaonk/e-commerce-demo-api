import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_DB_URL = 'mongodb://localhost:27017/e-commerce-demo';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DB_URL, {
      connectionName: 'e-commerce',
    }),
  ],
})
export class DbConnectorModule {}
