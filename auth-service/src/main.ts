import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from "@nestjs/microservices";
import { Logger } from '@nestjs/common';
import * as process from 'process'

const logger = new Logger();

// console.log(process.env.RABBITMQ_URL)
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${process.env.RABBITMQ_URL}`],
      queue: 'auth',
      queueOptions: { durable: false },
    }
  });

  await app.listen().then(() => logger.log('Microservice auth is listening'))
}
bootstrap();
