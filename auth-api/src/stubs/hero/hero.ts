/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero";

export interface SayHelloRequest {
  name?: string;
}

export interface SayHelloResponse {
  message?: string;
}

export interface Hero {
  name?: string;
  hp?: number;
  power?: number;
  id?: number;
}

export interface GetHeroRequest {
  id?: number;
}

export interface GetHeroResponse {
  hero?: Hero;
}

export interface GetHeroesRequest {
}

export interface GetHeroesResponse {
  hero?: Hero[];
}

export interface CreateHeroRequest {
  name?: string;
  power?: number;
}

export interface CreateHeroResponse {
  hero?: Hero;
}

export interface UpdateHeroRequest {
  name?: string;
  hp?: number;
  power?: number;
  id?: number;
}

export interface UpdateHeroResponse {
  hero?: Hero;
}

export interface DeleteHeroRequest {
  name?: string;
  id?: number;
}

export interface DeleteHeroResponse {
  hero?: Hero;
}

export const HERO_PACKAGE_NAME = "hero";

export interface HelloServiceClient {
  sayHello(request: SayHelloRequest, metadata?: Metadata): Observable<SayHelloResponse>;
}

export interface HelloServiceController {
  sayHello(
    request: SayHelloRequest,
    metadata?: Metadata,
  ): Promise<SayHelloResponse> | Observable<SayHelloResponse> | SayHelloResponse;
}

export function HelloServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HELLO_SERVICE_NAME = "HelloService";

export interface HeroServiceClient {
  getHero(request: GetHeroRequest, metadata?: Metadata): Observable<GetHeroResponse>;

  getHeroes(request: GetHeroesRequest, metadata?: Metadata): Observable<GetHeroesResponse>;

  createHero(request: CreateHeroRequest, metadata?: Metadata): Observable<CreateHeroResponse>;

  updateHero(request: UpdateHeroRequest, metadata?: Metadata): Observable<UpdateHeroResponse>;

  deleteHero(request: DeleteHeroRequest, metadata?: Metadata): Observable<DeleteHeroResponse>;
}

export interface HeroServiceController {
  getHero(
    request: GetHeroRequest,
    metadata?: Metadata,
  ): Promise<GetHeroResponse> | Observable<GetHeroResponse> | GetHeroResponse;

  getHeroes(
    request: GetHeroesRequest,
    metadata?: Metadata,
  ): Promise<GetHeroesResponse> | Observable<GetHeroesResponse> | GetHeroesResponse;

  createHero(
    request: CreateHeroRequest,
    metadata?: Metadata,
  ): Promise<CreateHeroResponse> | Observable<CreateHeroResponse> | CreateHeroResponse;

  updateHero(
    request: UpdateHeroRequest,
    metadata?: Metadata,
  ): Promise<UpdateHeroResponse> | Observable<UpdateHeroResponse> | UpdateHeroResponse;

  deleteHero(
    request: DeleteHeroRequest,
    metadata?: Metadata,
  ): Promise<DeleteHeroResponse> | Observable<DeleteHeroResponse> | DeleteHeroResponse;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getHero", "getHeroes", "createHero", "updateHero", "deleteHero"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HeroService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HeroService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = "HeroService";
