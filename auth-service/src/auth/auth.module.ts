import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "../users/users.module";
import * as process from "process"
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      PrismaModule,
      forwardRef(() => UsersModule),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions: {
            expiresIn: '24h'
          }
      })
  ],
  exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
