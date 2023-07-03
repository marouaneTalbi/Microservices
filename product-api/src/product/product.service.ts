import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from '../primsa.service';
import { Product, UpdateProductRequest } from 'src/stubs/product/message';
import { v4 as uuidv4 } from 'uuid';
import { ORDER_SERVICE_NAME, OrderServiceClient } from 'src/stubs/order/service';
import { Client, ClientGrpc, ClientProxy, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CreateOrderRequest, CreateOrderResponse, ORDER_PACKAGE_NAME } from 'src/stubs/order/message';


@Injectable()

export class ProductService 
  implements OnModuleInit 
{

  private orderService: OrderServiceClient;

  constructor(
    @Inject('OrderService') private readonly client: ClientGrpc,
     private prisma: PrismaService) {}

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceClient>('OrderService');
  }

  async buyProduct(req:any): Promise<any> {
    try {
      const createdOrder = await this.orderService.createOrder(req);
 
      console.log(req)
      return { order: createdOrder as any };

    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<any> {
  if (isNaN(data.price)) {
    throw new Error('Le prix doit être un nombre valide.');
  }

  const createdProduct = await this.prisma.product.create({
    data: {
      ...data,
    },
  });
  return createdProduct;
  }



  async getProduct(productId: any): Promise<any | null> {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async updateProduct(params: {
    where: any;
    data: any;
  }): Promise<any> {
    const { where, data } = params;

    return this.prisma.product.update({
      where,
      data,
    });
  }


  async deleteProduct(productId: any): Promise<any> {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async listProducts(): Promise<any[]> {
    return this.prisma.product.findMany();
  }
}