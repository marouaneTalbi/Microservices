/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "product";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
}

export interface CreateProductResponse {
  product: Product | undefined;
}

export interface GetProductRequest {
  id: string;
}

export interface GetProductResponse {
  product: Product | undefined;
}

export interface UpdateProductRequest {
  product: Product | undefined;
}

export interface UpdateProductResponse {
  product: Product | undefined;
}

export interface DeleteProductRequest {
  id: string;
}

export interface DeleteProductResponse {
  product: Product | undefined;
}

export interface ListProductsRequest {
}

export interface ListProductsResponse {
  products: Product[];
}

export const PRODUCT_PACKAGE_NAME = "product";
