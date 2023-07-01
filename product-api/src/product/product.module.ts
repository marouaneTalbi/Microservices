import { Module } from '@nestjs/common';
import { PrismaService } from 'src/primsa.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrderServiceClient } from 'src/stubs/order/service';
import { ORDER_PACKAGE_NAME } from 'src/stubs/order/message';
import { grpcConfig } from 'src/grpc.config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
@Module({

  imports: [
    GrpcReflectionModule.register(grpcConfig),
    ClientsModule.register([
      {
        name: ORDER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:4005',
          package: 'order',
          protoPath:'../proto/order/message.proto',
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}

