import { IsInt, IsString } from "class-validator";

export class CartDto{
    @IsString()
    productName: string;

    @IsInt()
    quantity: number;

    @IsInt()
    price: number
}