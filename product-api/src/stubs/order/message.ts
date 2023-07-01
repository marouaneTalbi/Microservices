/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "order";

export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface CreateOrderRequest {
  userId: string;
  productIds: string;
}

export interface CreateOrderResponse {
  order: Order | undefined;
}

export interface GetOrderRequest {
  id: string;
}

export interface GetOrderResponse {
  order: Order | undefined;
}

export interface UpdateOrderRequest {
  order: Order | undefined;
}

export interface UpdateOrderResponse {
  order: Order | undefined;
}

export interface DeleteOrderRequest {
  id: string;
}

export interface DeleteOrderResponse {
  order: Order | undefined;
}

export interface ListOrdersRequest {
  userId: string;
}

export interface ListOrdersResponse {
  orders: Order[];
}


export const ORDER_PACKAGE_NAME = "order";
