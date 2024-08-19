import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {MessagePattern} from "@nestjs/microservices";
import RequestWithUser from "./requestWithUser.interface";


@Controller('auth')
@ApiTags('Авторизация / Authorization')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({cmd: 'auth-registration'})
    registration(userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @MessagePattern({cmd: 'auth-login'})
    login(userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @MessagePattern({cmd: 'auth-logout'})
    logout() {
        return this.authService.logout()
    }

    @MessagePattern({cmd: 'auth-verify-jwt'})
    verifyJwt(data: { jwtToken: string, req: Request }) {
        return this.authService.verifyJwt(data.jwtToken)
    }
}
