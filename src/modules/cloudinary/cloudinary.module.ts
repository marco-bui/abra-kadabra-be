import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { LoggerService } from '../../common/services/logger.service';

@Module({
  imports: [],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, LoggerService],
})
export class CloudinaryModule {}
