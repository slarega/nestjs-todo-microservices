import {Controller, Post, Body, Res} from '@nestjs/common';
import { AuthRmqService } from './auth-rmq.service';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import { Response } from 'express';

@Controller('auth')
@ApiTags('Авторизация')
export class AuthRmqController {
    constructor(
        private readonly authServiceService: AuthRmqService
        ) {}

    @Post('/registration')
    @ApiOperation({summary: 'Регистрация пользователя / User registration'})
    @ApiOkResponse({type: UserEntity})
    registration(@Body() userDto: CreateUserDto) {
        return this.authServiceService.registration(userDto)
    }

    @Post('/login')
    @ApiOperation({ summary: 'Вход в систему / Login' })
    async login(
        @Body() userDto: CreateUserDto) {
            const token: string = await this.authServiceService.login(userDto)
            return token
    }

    @Post('/logout')
    @ApiOperation({ summary: 'Выход из системы / Logout' })
    async logout() {
            const token: string = await this.authServiceService.logout()
            return token
    }

    // @Post('/verifyJwt')
    // @ApiOperation({ summary: 'Токен' })
    // async verifyJwt(@Body() data1: {token: string}) {
    //         const jwtToken = data1.text
    //         const data: string = await this.authServiceService.verifyJwt(jwtToken)
    //         return data
    // }
}
