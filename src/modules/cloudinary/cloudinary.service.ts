import { HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ApiResponse } from '../../common/classes/api-response';
import { ApiMessage } from '../../common/constants/message';
import { LoggerService } from '../../common/services/logger.service';
import { Config } from '../../config/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly logger: LoggerService) {
    cloudinary.config({
      cloud_name: Config.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
      api_key: Config.CLOUDINARY.CLOUDINARY_API_KEY,
      api_secret: Config.CLOUDINARY.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: Express.Multer.File): Promise<ApiResponse<string>> {
    let url = null;
    try {
      const base64String = file.buffer.toString('base64');
      const image = `data:${file.mimetype};base64,${base64String}`;
      const result = await cloudinary.uploader.upload(image, {
        folder: Config.CLOUDINARY.CLOUDINARY_FOLDER,
      });
      url = result.secure_url;
    } catch (err) {
      this.logger.error(err?.message || err);
    }

    return {
      status: HttpStatus.OK,
      data: url,
      pagination: null,
      message: ApiMessage.UPLOAD_IMAGE,
    };
  }
}
