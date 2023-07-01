import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { ORDER_PACKAGE_NAME } from './stubs/order/message';
export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:4005',
    package: ORDER_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/order/message.proto'),
  },
}) as GrpcOptions;