import { Injectable } from '@nestjs/common';
import { JwtTokenService } from './jwt-token/jwt-token.service';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/createUser.dto';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private jwtTokenService: JwtTokenService,
        private prisma: PrismaClient,
        private config: ConfigService
    ) { }
    
     async registerUser(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await this.createHash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        gender: dto.gender,
        title: dto.title,
        dateOfBirth: dto.dateOfBirth,
        about: dto.about,
        isParent: false,
        emailAddress: {
          create: {
            email: dto.email,
          },
        },
        phoneNumber: {
          create: { phone: dto.phoneNumber },
        },
        password: {
          create: { hash: hashedPassword, salt: salt },
        },
      },
      include: {
        emailAddress: true,
        phoneNumber: true,
      },
    });
    const verificationToken = crypto.randomBytes(20).toString('hex');
    await this.prisma.token.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        token: verificationToken,
      },
    });
    //TO BE ADDED AS ENV VARIABLE
    const verificationURL = `${this.config.get(
      'BASE_URL',
    )}auth/email/confirm/${verificationToken}`;

    // await this.mailService.sendEmail(
    //   user,
    //   dto.email,
    //   'Please Verify Your Email',
    //   verificationURL,
    //   './verify-email.hbs',
    // );
    return {
      message: 'Account created successfully',
      user: user,
      tokens: await this.jwtTokenService.signTokens(user.id, dto.email, dto.password),
    };
    }
    
    private async createHash(password: string, salt: string) {
    return await bcrypt.hash(password, salt); // Hash the password with the salt
  }
}
