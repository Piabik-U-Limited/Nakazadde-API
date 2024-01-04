import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';

jest.mock('@nestjs/config');
jest.mock('speakeasy');

describe('OtpService', () => {
  let otpService: OtpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    otpService = new OtpService(configService);

    otpService = module.get<OtpService>(OtpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('generateOtp', () => {
    it('should generate a 6-digit OTP using the app secret', () => {
      // Arrange
      const mockGet = configService.get as jest.Mock;
      mockGet.mockReturnValue('mockAppSecret');

      const mockTotp = jest.spyOn(speakeasy, 'totp');
      mockTotp.mockReturnValue('123456'); // Set a fixed value for the mock OTP

      // Act
      const otp = otpService.generateOtp();

      // Assert
      expect(otp).toBe('123456'); // Check if the OTP matches the mock value
      expect(otp.length).toBe(6); // Check if the OTP is a 6-digit number
      expect(mockGet).toHaveBeenCalledWith('APP_SECRET');
      expect(mockTotp).toHaveBeenCalledWith({
        secret: 'mockAppSecret',
        encoding: 'base32',
        digits: 6,
      });
    });
  });
});
