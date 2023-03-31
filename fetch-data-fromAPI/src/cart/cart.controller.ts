import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Cart } from "src/schema/cartSchema";
import { CartService } from "./cart.service";
import { CartDto } from "src/dto/createCartDto";



@Controller('/cart')
export class CartController{

    constructor(private readonly cartService: CartService){}

    @Post()
    async creatCart(@Body(new ValidationPipe) cartDto: CartDto){
        return await this.cartService.addCart(cartDto);
    }

    @Get()
    async getCart(){
        return await this.cartService.getCart();
    }
}