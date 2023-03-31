import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { CountService } from './product/count.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ecomDB'),
    InventoryModule, CartModule
  ],
  controllers: [AppController],
  providers: [AppService, ProductService, CountService],
})
export class AppModule {}
