import { Module, NestModule, MiddlewareConsumer, RequestMethod, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from './logger.middleware';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity'

@Module({
    controllers: [UsersController],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ],
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
    ]
})
export class UsersModule implements OnModuleInit, OnModuleDestroy {
    constructor(
        //private transientService: UsersService,
        //private moduleRef: ModuleRef
    ) {}

    async onModuleInit(): Promise<void> {

        //! тут мы получаем доступ к инстансу провайдера-сервиса Юзерс (описано в разделе "Module reference")
        //this.transientService = await this.moduleRef.resolve(UsersService);
        //console.log(this.transientService.printTypeObject());
        //! end

        await new Promise((res) => {
            console.log('Users service init Event');
            res('destroy')
        })
    }

    async onModuleDestroy(): Promise<void> {
        await new Promise((res) => {
            console.log('Users service destroy Event');
            res('destroy')
        })
    }

    // configure(consumer: MiddlewareConsumer) {
    //     console.log('Middleware users get applying (from users module)')
    //     consumer
    //         .apply(LoggerMiddleware)
    //         .exclude(
    //             { path: 'cats', method: RequestMethod.GET },
    //             { path: 'cats', method: RequestMethod.POST },
    //             'cats/{*splat}',
    //         )
    //         .forRoutes({ path: 'users', method: RequestMethod.GET });
    // }
}