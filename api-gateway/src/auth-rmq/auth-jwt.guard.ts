import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {AuthRmqService} from "./auth-rmq.service";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private readonly authServiceService: AuthRmqService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {

            const authHeader = req.headers['x-bearer-token'].split(' ')

            if (authHeader[0] !== 'Bearer' || !authHeader[1]) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            // this.check(authHeader[1]).then((res) => {
            //     req.user = res
            //     // console.log(res)
            // })

            return true;
        } catch (err) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }

    async check(token) {
        return await this.authServiceService.verifyJwt(token)
    }
}