import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      optionsSuccessStatus: 204,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: true },
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
