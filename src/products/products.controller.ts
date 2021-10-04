import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const genereatedId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: genereatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }
}
