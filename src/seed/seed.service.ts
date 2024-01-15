import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productSevice: ProductsService
  ) {}
  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTED';
  }
  private async insertNewProducts() {
    await this.productSevice.deleteAllProducts();
    
    const products = initialData.products;

    const instertPromises = [];

    products.forEach ( product => {
      instertPromises.push( this.productSevice.create( product ) )
    });

    await Promise.all( instertPromises )

    return true;
  }
}
