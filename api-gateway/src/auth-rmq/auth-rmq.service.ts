import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateUserDto} from "./dto/create-user.dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AuthRmqService {

    constructor(@Inject('auth-rmq') private readonly client: ClientProxy) {}

    async registration(userDto: CreateUserDto) {
        const ob$ = this.client.send({cmd: 'auth-registration'}, userDto)
        return await firstValueFrom(ob$).catch((err) => console.error(err))
    }

    async login(userDto: CreateUserDto) {
        const ob$ = this.client.send({cmd: 'auth-login'}, userDto)
        return await firstValueFrom(ob$).catch((err) => console.error(err))
    }

    async logout() {
        const ob$ = this.client.send({cmd: 'auth-logout'},{})
        return await firstValueFrom(ob$).catch((err) => console.error(err))
    }

    async verifyJwt(jwtToken: string) {
        const ob$ = this.client.send({cmd: 'auth-verify-jwt'},{jwtToken})
        return await firstValueFrom(ob$).catch((err) => console.error(err))
    }
}
