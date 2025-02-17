import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './users/logger.middleware';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            // rootPath: path.join(__dirname, '..', 'static'),
            // serveRoot: '/',
            // exclude: ['/api*'],
            rootPath: resolve(__dirname, '../client/dist'),
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        console.log('Middleware users get applying');
        consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET });
        //можно пихнуть сюда целиком контроллер: consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    }
}
