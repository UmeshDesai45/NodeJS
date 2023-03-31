import { Injectable } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { CountService } from './product/count.service';

@Injectable()
export class AppService {
  constructor(private productService: ProductService, private countService: CountService){}
  
  async getData() {
    try {
      const data= await this.productService.fetchDataFromAPI();
      // //count prodct names
      // const filteredProducts = data.filter(product => product.name === prodName);
      // const count = filteredProducts.length;
      // console.log(count);

      const count= await this.countService.getCountByNames(data);
      //console.log(count);
      return data;
    } 
    catch (error) {
      return error;
    }
  }
}
