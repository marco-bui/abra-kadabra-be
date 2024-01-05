import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './common/services/logger.service';
import { Config } from './config/config';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.JWT.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
    CloudinaryModule,
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
