import { Controller, Get } from "@nestjs/common";
import { InventoryService } from "./inventory.service";


@Controller('/inventory')
export class InventoryController{

    constructor(private readonly inventoryService: InventoryService){}

    @Get()
    async getInventory() {
        return await this.inventoryService.getInventory();
    }
}