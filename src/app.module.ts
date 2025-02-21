import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';import { resolve } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './users/logger.middleware';
import { CompaniesModule } from './companies/companies.module';

import dbConfiguration from "./config/db.config";
import { APP_FILTER } from '@nestjs/core';

import { NotFoundExceptionFilter } from './HttpException.filter';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => (Object.assign({...configService.get('database')}, {autoLoadEntities: true})),
        }),
        ConfigModule.forRoot({
            envFilePath: '.env.development',
            isGlobal: true,
            load: [dbConfiguration],
        }),



        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, '../client/dist'),
            serveRoot: '/',
            // exclude: ['/users*', '/companies*']
        }),



        CompaniesModule,
        UsersModule,
    ],
    controllers: [],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter
        }
    ],
})

export class AppModule implements NestModule {

    //! экспорт сервиса UsersService из UsersModule делает возможным использовать его в AppModule
    constructor(
        private readonly usersService: UsersService,
        private configModule: ConfigService
    ) {
        console.log(`Модуль Users используется внутри AppModule (выводим this.usersService.TYPE): ${this.usersService.TYPE.TEST}`);
        //console.log('App module configModule:', configModule);
    }

    configure(consumer: MiddlewareConsumer) {
        console.log('Middleware users get applying (from app module)')
        consumer.apply(LoggerMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET });
        //можно пихнуть сюда целиком контроллер: consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    }
}
