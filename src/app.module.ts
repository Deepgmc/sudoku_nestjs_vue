import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';

@Module({
    imports: [
        ConfigModule,
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, '../client/dist'),
            serveRoot: '/',
            exclude: ['/users*']
        }),
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'Qwe12345678qwE-===',
            database: 'corp',
            entities: [Users],
            synchronize: true,
        }),
    ],
    controllers: [],//[AppController],//UsersController
    providers: [AppService],
})

export class AppModule implements NestModule {

    //! экспорт сервиса UsersService из UsersModule делает возможным использовать его в AppModule и везде
    constructor(
        private readonly usersService: UsersService,
        private configModule: ConfigService
    ) {
        console.log(`AppModule constructor with usersService: ${this.usersService.TYPE.TEST}`);
        console.log('App module configModule:', configModule);
    }

    configure(consumer: MiddlewareConsumer) {
        //console.log('Middleware users get applying (from app module)')
        //consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET });
        //можно пихнуть сюда целиком контроллер: consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    }
}
