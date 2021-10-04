import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const genereatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: genereatedId };
  }

  @Get()
  async getAllProducts() {
    const products = this.productService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateproduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') price: number,
  ) {
    await this.productService.updateProduct(prodId, prodTitle, prodDesc, price);
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}
