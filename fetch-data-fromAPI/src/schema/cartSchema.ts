import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CartDocument = Cart & Document;
@Schema()
export class Cart{
    @Prop()
    productName: string;

    @Prop()
    quantity: number;

    @Prop()
    price: number
}

export const CartSchema= SchemaFactory.createForClass(Cart);