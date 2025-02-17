import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    /*<NestExpressApplication> можно передать*/
    const app = await NestFactory.create(AppModule, { abortOnError: false });
    //app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();