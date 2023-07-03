import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PrismaService } from 'src/primsa.service';
import { ORDER_PACKAGE_NAME } from 'src/stubs/order/message';
import { AuthModule } from '../auth/auth.module';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from 'src/grpc.config';

@Module({
  imports: [
    GrpcReflectionModule.register(grpcConfig),
    ClientsModule.register([
      {
          name: 'OrderService', 
          transport: Transport.GRPC,
          options: {
            package: 'order',
            protoPath: '../proto/order/message.proto',
          },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
