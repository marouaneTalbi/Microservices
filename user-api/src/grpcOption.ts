import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';

export default (cs: ConfigService) =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: 'user.v1alpha',
      url: `0.0.0.0:${cs.get('PORT') || 4002}`,
      credentials: !cs.get<boolean>('insecure')
        ? ServerCredentials.createSsl(null, [
            {
              private_key: readFileSync(cs.get('USER_KEY')),
              cert_chain: readFileSync(cs.get('USER_CERT')),
            },
          ])
        : ServerCredentials.createInsecure(),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      protoPath: [join(__dirname, 'proto/user/v1alpha/service.proto')],
    },
  } as GrpcOptions);

export const authGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: 'auth',
  transport: Transport.GRPC,
  options: {
    url: cs.get('AUTH_API_URL'),
    package: 'auth.v1alpha',
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/auth/v1alpha/service.proto')],
    keepalive: {
      keepaliveTimeMs: 10 * 1000,
      keepaliveTimeoutMs: 5 * 1000,
      keepalivePermitWithoutCalls: 1,
    },
    credentials: !cs.get<boolean>('insecure')
      ? ChannelCredentials.createSsl(
          readFileSync(cs.get('ROOT_CA')),
          readFileSync(cs.get('USER_KEY')),
          readFileSync(cs.get('USER_CERT')),
        )
      : ChannelCredentials.createInsecure(),
  },
});
