import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {PrismaModule} from "./prisma/prisma.module";
import {RolesModule} from "./roles/roles.module";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [
      AuthModule,
      PrismaModule,
      RolesModule,
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
