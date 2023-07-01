import { Controller, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { 
  CreateProductRequest,
  CreateProductResponse,
  GetProductRequest,
  GetProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  BuyProductRequest, BuyProductResponse 
} from 'src/stubs/product/message';
import { CreateOrderRequest, CreateOrderResponse } from 'src/stubs/order/message';
import { ProductServiceController } from 'src/stubs/product/service';

@Controller()
export class ProductController implements ProductServiceController {

  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService')
  async BuyProduct(
    req: CreateOrderRequest,
  ): Promise<CreateOrderResponse> {
    try {
      const createdOrder = await this.productService.buyProduct(req);
      return { order: createdOrder as any };
    } catch (error) {
      console.log(error);
    }
  }

  @GrpcMethod('ProductService')
  async createProduct(
    req: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    try {
      const createdProduct = await this.productService.createProduct(req);
      return { product: createdProduct as any };
    } catch (error) {
      console.log(error)
      // Handle error
    }
  }



  @GrpcMethod('ProductService')
  async getProduct(req: GetProductRequest): Promise<GetProductResponse> {
    try {
      const product = await this.productService.getProduct(req.id);
      return { product: product as any };
    } catch (error) {
      console.log(error)
      // Handle error
    }
  }

  @GrpcMethod('ProductService')
  async updateProduct(
    req: UpdateProductRequest,
  ): Promise<UpdateProductResponse> {
    try {
      const { id, ...productData } = req.product;
      const updatedProduct = await this.productService.updateProduct({
        where: { id },
        data: productData,
      });
      return { product: updatedProduct as any };
    } catch (error) {
      console.log(error);
      // Handle error
    }
  }


  @GrpcMethod('ProductService')
  async deleteProduct(
    req: DeleteProductRequest,
  ): Promise<DeleteProductResponse> {
    try {
      const deletedProduct = await this.productService.deleteProduct(req.id);
      return { product: deletedProduct as any };
    } catch (error) {
      console.log(error)
      // Handle error
    }
  }

  @GrpcMethod('ProductService')
  async listProducts(
    req: ListProductsRequest,
  ): Promise<ListProductsResponse> {
    try {
      const products = await this.productService.listProducts();
      return { products: products as any };
    } catch (error) {
      console.log(error)
      // Handle error
    }
  }
}
