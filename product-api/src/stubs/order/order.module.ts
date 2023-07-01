import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { OrderServiceClient } from './service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'OrderService',
      },
    ]),
  ],
  // providers: [OrderServiceClient],
})
export class OrderModule {}
