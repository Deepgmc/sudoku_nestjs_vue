import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '../config/auth.config';
import { Request } from 'express'

@Injectable()
export class MyAuthGuard implements CanActivate {
    constructor (private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync (
                token,
                {secret: jwtConstants.secret}
            )
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user_id'] = payload.id
            request['user_role'] = payload.role
            request['user_name'] = payload.name

        } catch {
            throw new UnauthorizedException()
        }
        return true
    }

    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}