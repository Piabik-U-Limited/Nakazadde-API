import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenService } from './jwt-token/jwt-token.service';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/createUser.dto';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/loginDto.dto';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtTokenService,
    private prisma: PrismaClient,
    private config: ConfigService,
    private mailService: MailService,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await this.createHash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth,
        about: dto.about,
        location: dto.location,
        email: {
          create: {
            email: dto.email,
          },
        },
        phone: {
          create: { phone: dto.phone },
        },
        password: {
          create: { hash: hashedPassword, salt: salt },
        },
      },
      include: {
        email: true,
        phone: true,
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

    await this.mailService.sendMail(
      user.email.email,
      'Verify Email',
      {
        name: user.name,
        url: verificationURL,
      },

      './verify-email.hbs',
    );
    return {
      message: 'Account created successfully',
      user: user,
      tokens: await this.jwtTokenService.signTokens(
        user.id,
        dto.email,
        dto.password,
      ),
    };
  }

  private async createHash(password: string, salt: string) {
    return await bcrypt.hash(password, salt); // Hash the password with the salt
  }

  //Login
  async loginUser(dto: LoginDto) {
    const email = await this.prisma.emailAddress.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!email) throw new NotFoundException('Email address does not exist');
    const user = await this.prisma.user.findUnique({
      where: {
        id: email.userId,
      },
      include: {
        email: { select: { email: true, isVerified: true } },
        phone: { select: { phone: true, isVerified: true } },
         
      
      }
    });
    if (!user) throw new NotFoundException('Invalid Credentials');
    const password = await this.prisma.password.findUnique({
      where: { userId: user.id },
    });
    if (!password)
      return new HttpException(
        {
          message: 'You need to set a password',
          user,
        },
        HttpStatus.CONTINUE,
      );
    const passwordMatch = await bcrypt.compare(dto.password, password.hash);
    if (!passwordMatch) throw new NotFoundException('Invalid Password');
    return {
      message: 'Login successful',
      user: user,
      tokens: await this.jwtTokenService.signTokens(
        user.id,
        dto.email,
        dto.password,
      ),
    };
  }
}
