import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../primsa.service';
import { Order } from 'src/stubs/order/message';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

 async createOrder(data: any): Promise<any> {
    const { userId, productId, ...rest } = data;


    const createdOrder = await this.prisma.order.create({
      data: {
        ...rest,
        user: { connect: { id: parseInt(userId, 10) } },
        products: { connect: { id: parseInt(productId, 10) } },
      },
    });

    console.log(data)


    return createdOrder;
  }

  async getOrder(orderId: any): Promise<any | null> {
    return this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }

  async updateOrder(params: {
    where: any;
    data: any;
  }): Promise<any> {
    const { where, data } = params;

    return this.prisma.order.update({
      where,
      data,
    });
  }

  async deleteOrder(orderId: any): Promise<any> {
    return this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }

  async listOrders(): Promise<any[]> {
    return this.prisma.order.findMany();
  }
}
