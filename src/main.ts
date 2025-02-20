import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: true });
    //app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({
            disableErrorMessages: false,//расширенные сообщения валидации входящих параметров для ДТО
            whitelist: false,
            transform: false//хрень полная, пытается кастить строку в число в итоге выкидывает ошибку, что всё крашится
        }
    ));
    await app.listen(process.env.LISTEN_PORT ?? 0);
}
bootstrap();