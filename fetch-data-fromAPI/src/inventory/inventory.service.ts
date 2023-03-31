import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InventoryDocument } from "src/schema/inventorySchema";
import { CountService } from "src/product/count.service";
import { ProductService } from "src/product/product.service";
import { Inventory } from '../schema/inventorySchema';


@Injectable()
export class InventoryService{
    constructor(
        private productService: ProductService, 
        private countService: CountService,
        @InjectModel('inventory') private readonly inventoryModel: Model<InventoryDocument>,
        
        ){}

    async getInventory(){

        try {
            const data= await this.productService.fetchDataFromAPI();
            const count= await this.countService.getCountByNames(data);
            console.log(count);
            await this.insertIntoDB1(count);
            //await this.updateInventory('64253d6f50a0e2fd1e55747a',count);

            return await this.inventoryModel.find();
            
        } 
        catch (error) {
            return error;
        }
    }

    // async insertIntoDB(data){
    //     try {
    //         // const newData = new this.inventoryModel(data)
    //         // await newData.save();

    //         // //Iterate over the object data and find each product
    //         // const inventoryObjects = Object.entries(data).map(([productName, quantity]) => ({ productName, quantity }));
    //         // await this.inventoryModel.insertMany(inventoryObjects);

    //         for (const key in data) {
    //             if (data.hasOwnProperty(key)) {
    //               const inventory = await this.inventoryModel.findOne({ productName: key });
    //               if (inventory) {
    //                 inventory.quantity += data[key];
    //                 await inventory.save();
    //               } else {
    //                 const newInventory = new this.inventoryModel({ productName: key, quantity: data[key] });
    //                 await newInventory.save();
    //               }
    //             }
    //         }
            
    //     } 
    //     catch (error) {
    //       return error;  
    //     }
    // }

    async updateInventory(id,data): Promise<Inventory>{
        try {
          return await this.inventoryModel.findByIdAndUpdate(id, data, {new: true});
        }
        catch (error) {
          return error;
        }
    }

    async insertIntoDB1(count: { [name: string]: number }) {
        try {
          const products = Object.keys(count);
          const inventoryPromises = products.map(async (productName) => {
            const existingProduct = await this.inventoryModel.findOne({ productName });
            if (existingProduct) {
              // Update quantity of existing product document
            if(existingProduct.quantity !== count[productName]){
                existingProduct.quantity = count[productName];
                return existingProduct.save();
            }
            else{
                return existingProduct;
            }
              
            } else {
              // Create new product document
              const newProduct = new this.inventoryModel({
                productName,
                quantity: count[productName],
              });
              return newProduct.save();
            }
          });
          await Promise.all(inventoryPromises);
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException('Failed to update inventory');
        }
    }
}