import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { LoggerService } from '../../common/services/logger.service';

@Controller('cloudinary')
@ApiTags('Cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly logger: LoggerService,
  ) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload image',
    description: 'Upload image',
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      description: 'Image file',
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const res = await this.cloudinaryService.upload(file);
      return res;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
