import { Module } from '@nestjs/common';
import { AuthRmqModule } from './auth-rmq/auth-rmq.module';
import {ProjectRmqModule} from "./project-rmq/project-rmq.module";
@Module({
  imports: [
      ProjectRmqModule,
      AuthRmqModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
