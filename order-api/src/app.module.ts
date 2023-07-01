import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

import { OrderModule } from './order/order.module';
import { grpcConfig } from './grpc.config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig),OrderModule],
  // controllers: [AppController],
  // providers: [AppService],

  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class AppModule {}
