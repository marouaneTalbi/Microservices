import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
} from 'src/stubs/order/message';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService')
  async CreateOrder(
    req: CreateOrderRequest,
  ): Promise<CreateOrderResponse> {
    try {
      const createdOrder = await this.orderService.createOrder(req);
      return { order: createdOrder as any };
    } catch (error) {
      console.log(error);
    }
  }

  @GrpcMethod('OrderService')
  async GetOrder(req: GetOrderRequest): Promise<GetOrderResponse> {
    try {
      const order = await this.orderService.getOrder(req.id);
      return { order: order as any };
    } catch (error) {
      console.log(error);
      // Handle error
    }
  }

  @GrpcMethod('OrderService')
  async UpdateOrder(
    req: UpdateOrderRequest,
  ): Promise<UpdateOrderResponse> {
    try {
      const { id, ...ordertData } = req.order;
      const updatedOrder = await this.orderService.updateOrder({
        where: { id },
        data: ordertData,
      });
      return { order: updatedOrder as any };
    } catch (error) {
      console.log(error);
      // Handle error
    }
  }

  @GrpcMethod('OrderService')
  async DeleteOrder(
    req: DeleteOrderRequest,
  ): Promise<DeleteOrderResponse> {
    try {
      const deletedOrder = await this.orderService.deleteOrder(req.id);
      return { order: deletedOrder as any };
    } catch (error) {
      console.log(error);
      // Handle error
    }
  }

  @GrpcMethod('OrderService')
  async ListOrders(
    req: ListOrdersRequest,
  ): Promise<ListOrdersResponse> {
    try {
      const orders = await this.orderService.listOrders();
      return { orders: orders as any };
    } catch (error) {
      console.log(error);
      // Handle error
    }
  }
}
