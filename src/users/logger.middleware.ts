import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {
        console.warn('LoggerMiddleware constructor');
    }
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...', req.method, req.url);
        console.log('From LoggerMiddleware. usersService.PROD_TYPE:', this.usersService.TYPE.DEV);
        next();
    }
}