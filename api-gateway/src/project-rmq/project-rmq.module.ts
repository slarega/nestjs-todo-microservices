import { Module } from '@nestjs/common';
import {ProjectRmqService} from './project-rmq.service';
import {ProjectRmqController} from './project-rmq.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AuthRmqModule} from "../auth-rmq/auth-rmq.module";
import {ProjectRmqColumnsController} from "./project-rmq-columns.controller";
import {ProjectRmqTasksController} from "./project-rmq-tasks.controller";
import { ProjectRmqColumnsService} from "./project-rmq-columns.service";
import {ProjectRmqTasksService} from "./project-rmq-tasks.service";
import * as process from 'process'

@Module({
  imports: [
      AuthRmqModule,
      ClientsModule.register([
          {
              name: 'project-service',
              transport: Transport.RMQ,
              options: {
                  urls: ['amqp://admin:admin@localhost:5672'],  //localhost     rabbitmq
                  queue: 'project',
                  queueOptions: { durable: false }
              }
          }
      ]),
  ],
  controllers: [
      ProjectRmqController,
      ProjectRmqColumnsController,
      ProjectRmqTasksController
  ],
  providers: [
      ProjectRmqService,
      ProjectRmqColumnsService,
      ProjectRmqTasksService
  ],

})
export class ProjectRmqModule {}
