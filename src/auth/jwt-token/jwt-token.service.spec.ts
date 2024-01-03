import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from './jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';

jest.mock('@nestjs/jwt');

describe('JwtTokenService', () => {
  let jwtTokenService: JwtTokenService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('signTokens', () => {
    it('should sign and return access_token and refresh_token', async () => {
      // Arrange
      const mockSignAsync = jwtService.signAsync as jest.Mock;
      mockSignAsync.mockResolvedValueOnce('mockAccessToken');
      mockSignAsync.mockResolvedValueOnce('mockRefreshToken');

      const userId = '123';
      const email = 'test@example.com';
      const password = 'password';

      // Act
      const tokens = await jwtTokenService.signTokens(userId, email, password);

      // Assert
      expect(tokens).toEqual({
        access_token: 'mockAccessToken',
        refresh_token: 'mockRefreshToken',
      });
      expect(mockSignAsync).toHaveBeenCalledWith(
        {
          userId,
          email,
          password,
        },
        expect.objectContaining({
          secret: configService.get('APP_SECRET'),
          expiresIn: '1d',
        }),
      );
      expect(mockSignAsync).toHaveBeenCalledWith(
        {
          userId,
          email,
          password,
        },
        expect.objectContaining({
          secret: configService.get('APP_SECRET'),
          expiresIn: '12h',
        }),
      );
    });
  });

  describe('verifyToken', () => {
    it('should verify the token and return decoded data', () => {
      // Arrange
      const mockVerify = jwtService.verify as jest.Mock;
      mockVerify.mockReturnValue('decodedData');

      const mockToken = 'mockToken';

      // Act
      const decodedData = jwtTokenService.verifyToken(mockToken);

      // Assert
      expect(decodedData).toEqual('decodedData');
      expect(mockVerify).toHaveBeenCalledWith(
        mockToken,
        configService.get('APP_SECRET'),
      );
    });

    it('should throw ForbiddenException for invalid or expired token', () => {
      // Arrange
      const mockVerify = jwtService.verify as jest.Mock;
      mockVerify.mockImplementation(() => {
        throw new Error('Token is invalid or has expired');
      });

      const mockToken = 'invalidToken';

      // Act & Assert
      expect(() => jwtTokenService.verifyToken(mockToken)).toThrowError(
        ForbiddenException,
      );
    });
  });
});