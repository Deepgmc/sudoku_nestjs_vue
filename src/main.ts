import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

/**
 * BOOTSTRAP FUNC
 * @constructor
 *
   @returns {void} ничего
 */
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule, {
        abortOnError: true,
        logger: new ConsoleLogger({
            colors: true,
            prefix: 'Umb',
        }),
    }
    );

    app.useGlobalPipes(new ValidationPipe({
        //https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
        disableErrorMessages: false,//расширенные сообщения валидации входящих параметров для ДТО
        whitelist: true,
        transform: true,
        //exceptionFactory
    }))


    //!Global app prefix

    //app.setGlobalPrefix('api');

    app.setGlobalPrefix('api', {
        exclude: [{ path: '/', method: RequestMethod.GET }],
    })

    //? выключает только companies без вложенностей
    //? app.setGlobalPrefix('api', { exclude: ['companies'] });



    //? Работа с сессиями
    // $ npm i express-session
    // $ npm i -D @types/express-session
    // app.use(
    //     session({
    //         secret: 'my-secret',
    //         resave: false,
    //         saveUninitialized: false,
    //     }),
    // );
    //пример использования:
    // @Get()
    // findAll(@Session() session: Record<string, any>) {
    //     session.visits = session.visits ? session.visits + 1 : 1;
    // }


    //! Static rendering via handlebars
    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('hbs');

    const port = process.env.LISTEN_PORT ?? 0
    await app.listen(port);
    const logger = new Logger(`INIT END: ${port}`)
    logger.error('####################################')
};
bootstrap();