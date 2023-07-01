import { Module } from '@nestjs/common';
import { PrismaService } from 'src/primsa.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from 'src/grpc.config';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig)],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
