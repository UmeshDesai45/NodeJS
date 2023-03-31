import { Injectable } from "@nestjs/common";


@Injectable()
export class CountService{
    async getCountByNames(data): Promise<{ [name: string]: number; }> {
        const countByNames = data.reduce((acc, product) => {
          if (acc[product.name]) {
            acc[product.name] += 1;
          } else {
            acc[product.name] = 1;
          }
          return acc;
        }, {});
        return countByNames;
      }
}