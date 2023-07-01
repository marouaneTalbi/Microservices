/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "./message";

export const protobufPackage = "order";

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest, metadata?: Metadata): Observable<CreateOrderResponse>;

  getOrder(request: GetOrderRequest, metadata?: Metadata): Observable<GetOrderResponse>;

  updateOrder(request: UpdateOrderRequest, metadata?: Metadata): Observable<UpdateOrderResponse>;

  deleteOrder(request: DeleteOrderRequest, metadata?: Metadata): Observable<DeleteOrderResponse>;

  listOrders(request: ListOrdersRequest, metadata?: Metadata): Observable<ListOrdersResponse>;
}

export interface OrderServiceController {
  createOrder(
    request: CreateOrderRequest,
    metadata?: Metadata,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;

  getOrder(
    request: GetOrderRequest,
    metadata?: Metadata,
  ): Promise<GetOrderResponse> | Observable<GetOrderResponse> | GetOrderResponse;

  updateOrder(
    request: UpdateOrderRequest,
    metadata?: Metadata,
  ): Promise<UpdateOrderResponse> | Observable<UpdateOrderResponse> | UpdateOrderResponse;

  deleteOrder(
    request: DeleteOrderRequest,
    metadata?: Metadata,
  ): Promise<DeleteOrderResponse> | Observable<DeleteOrderResponse> | DeleteOrderResponse;

  listOrders(
    request: ListOrdersRequest,
    metadata?: Metadata,
  ): Promise<ListOrdersResponse> | Observable<ListOrdersResponse> | ListOrdersResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder", "getOrder", "updateOrder", "deleteOrder", "listOrders"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
