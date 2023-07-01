import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

import {GrpcReflectionModule} from "nestjs-grpc-reflection";
import {grpcConfig} from "./grpc.config";
import { APP_FILTER } from '@nestjs/core';
import { OrderModule } from './stubs/order/order.module';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig),ProductModule, OrderModule],
  providers: [  {
    provide: APP_FILTER,
    useClass: GrpcServerExceptionFilter,
  },],
})
export class AppModule {}
