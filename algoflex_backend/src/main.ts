import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const DOMAIN_WHITE_LIST = ['http://localhost:3000', 'https://staging-algoflex.heroku.app', 'https://algoflex.netlify.app'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useWebSocketAdapter(new WsAdapter(app));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: DOMAIN_WHITE_LIST,
    credentials: true,
  });
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Algoflex API backend')
    .setDescription("API to retrieve problem's data")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4100);
}
bootstrap();
