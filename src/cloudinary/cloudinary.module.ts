import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [CloudinaryService,ConfigService]
})
export class CloudinaryModule {}
