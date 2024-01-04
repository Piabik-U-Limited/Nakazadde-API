import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get('CLOUDINARY_API_KEY'),
      api_secret: this.config.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: any, folder: string): Promise<any> {
    const uniqueFilename = new Date().toISOString();

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        {
          public_id: `nakazadde/${folder}/${uniqueFilename}`,
          tags: `${folder}`,
        }, // directory and tags are optional
        function (error, image) {
          if (error) return reject(error);
          return resolve(image);
        },
      );
    });
  }

  async deleteFile(publicId: string, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, function (error, result) {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }
}
