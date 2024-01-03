import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/loginDto.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailGuard } from './guards/email.guard';
import { PhoneGuard } from './guards/phone.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
          description: "User's full name",
        },

        email: {
          type: 'string',
          example: 'johndoe@example.com',
          description: 'User email address',
        },
        phone: {
          type: 'string',
          example: '+256756984343',
          description: 'User phone number',
        },
        gender: {
          type: 'string',
          example: 'Male',
          description: 'User gender',
        },
        password: {
          type: 'string',
          example: '#xl3FJl#100',
          description: 'User Password',
        },
        dateOfBirth: {
          type: 'date',
          example: new Date(),
          description: 'User date of birth',
        },
        about: {
          type: 'string',
          example: 'This is my about',
          description: 'User bio',
        },
occupation: {
  type: 'string',
  example: 'Doctor',
  description: 'User occupation',
},
        location: {
          type: 'string',
          example: 'Kampala,UG',
          description: "User's Location",
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 409,
    description: 'Conflict: email or phone is already in use',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(EmailGuard, PhoneGuard)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndoe@example.com',
          description: 'User email address',
        },
        password: {
          type: 'string',
          example: '#xl3FJl#100',
          description: 'User Password',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() dto: LoginDto) {
    return this.authService.loginUser(dto);
  }
}
