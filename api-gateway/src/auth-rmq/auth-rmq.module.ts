import { Module } from '@nestjs/common';
import { AuthRmqService } from './auth-rmq.service';
import { AuthRmqController } from './auth-rmq.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {JwtModule} from "@nestjs/jwt";
import * as process from 'process'

// console.log(process.env.RABBITMQ_URL)
@Module({
  imports: [
      ClientsModule.register([
          {
              name: 'auth-rmq',
              transport: Transport.RMQ,
              options: {
                  urls: ['amqp://admin:admin@localhost:5672'],
                  queue: 'auth',
                  queueOptions: { durable: false }
              }
          }
      ]),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions: {
            expiresIn: '24h'
          }
      })
  ],
  controllers: [AuthRmqController],
  providers: [AuthRmqService],
  exports: [
      JwtModule,
      AuthRmqService
  ]
})
export class AuthRmqModule {}
