import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useWebSocketAdapter(new IoAdapter(app));

  // Middleware de logging
  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });

  await app.listen(3000);
}
bootstrap();
