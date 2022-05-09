import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3002).then(() => console.log('[Gateway] HTTP server running!'));
}
bootstrap();
