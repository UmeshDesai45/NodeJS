import { Module } from "@nestjs/common";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { ProductService } from '../product/product.service';
import { CountService } from "src/product/count.service";
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema } from '../schema/inventorySchema';




@Module({
    imports: [MongooseModule.forFeature([{name: 'inventory', schema: InventorySchema}])],
    controllers: [InventoryController],
    providers: [InventoryService, ProductService, CountService]
})
export class InventoryModule{}