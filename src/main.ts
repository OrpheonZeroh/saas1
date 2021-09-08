import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(':tenant?/api/v1');
  await app.listen(AppModule.port);
}
bootstrap();
