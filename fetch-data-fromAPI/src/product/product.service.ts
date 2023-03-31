import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class ProductService {
    async fetchDataFromAPI(): Promise<any> {
        try {
            const response= await axios.get("http://localhost:8003/product");
            if(!response.data || Object.keys(response.data).length === 0){
                throw new Error("No data returned from API");
            }
            console.log(response.data);
            return response.data;
        } 
        catch (error) {
            if(error.message==="No data returned from API"){
                return { status: 404, message: "No data found" };
            }
            return { status: 500, message: error.message };
        }
    }
}