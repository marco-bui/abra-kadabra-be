import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Config } from './common/config/config';
import { CustomValidationPipe } from './common/exceptions/validation.pipe';
import { LoggerService } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    abortOnError: true,
  });

  app.setGlobalPrefix('alakazam/api', { exclude: ['health'] });

  app.useGlobalPipes(new CustomValidationPipe({ whitelist: false }));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  const documentConfig = new DocumentBuilder()
    .setTitle('Abra Kadabra Magic')
    .setDescription('Abra Kadabra API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('alakazam/docs', app, document);

  const logger = new LoggerService();
  await app.listen(Config.PORT || 3030, () => {
    logger.infor('Nest application is running on port 3030');
  });
}
bootstrap();
