import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  const port = process.env.PORT || 3000;
  await app.listen(8080);
  console.log(`🚀 Backend escuchando en el puerto ${port}`);
}
bootstrap();
