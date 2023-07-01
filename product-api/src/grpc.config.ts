import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { PRODUCT_PACKAGE_NAME } from './stubs/product/message';
export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:4004',
    package: PRODUCT_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/product/message.proto'),
  },
}) as GrpcOptions;