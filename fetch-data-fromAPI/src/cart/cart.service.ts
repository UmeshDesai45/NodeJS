import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, model } from "mongoose";
import { Cart, CartDocument } from "src/schema/cartSchema";



@Injectable()
export class CartService{
    constructor(@InjectModel('cart') private readonly cartModel: Model<CartDocument>){}

    async addCart(cart: Cart){
        const newCart= new this.cartModel(cart);
        
        return newCart.save();
    }

    async getCart(){
        return this.cartModel.find();
    }

}