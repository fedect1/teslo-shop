import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';

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
    return true;
  }
}
