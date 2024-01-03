import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy'

@Injectable()
export class OtpService {
  constructor(private config: ConfigService) {}
  public generateOtp() {
    const otp = speakeasy.totp({
      secret: this.config.get('APP_SECRET'),
      encoding: 'base32',
      digits: 6,
    });

    return otp;
  }
}