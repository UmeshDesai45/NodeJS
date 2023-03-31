import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type InventoryDocument = Inventory & Document;
@Schema()
export class Inventory{
    @Prop()
    productName: string;

    @Prop()
    quantity: number;
}

export const InventorySchema= SchemaFactory.createForClass(Inventory);