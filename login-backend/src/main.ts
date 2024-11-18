import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from frontend on port 3000
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
    credentials: true,               // Allow credentials like cookies if needed
  });

  await app.listen(4000);
}
bootstrap();
