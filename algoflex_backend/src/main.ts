import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DOMAIN_WHITE_LIST = ['http://localhost:3000', 'https://staging-algoflex.heroku.app'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

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
