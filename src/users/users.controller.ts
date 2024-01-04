import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  Body,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { UserGuard } from './guards/user.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
  })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
  })
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
          description: "User's full name",
        },

        gender: {
          type: 'string',
          example: 'Male',
          description: 'User gender',
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
  @ApiResponse({
    status: 200,
    description: 'Update user by id',
  })
  @UseGuards(UserGuard)
  async editUser(@Param('id') id: string, @Body() dto: EditUserDto) {
    return this.usersService.editUser(id, dto);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
          description: "User's full name",
        },

        gender: {
          type: 'string',
          example: 'Male',
          description: 'User gender',
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
  @ApiResponse({
    status: 200,
    description: 'Update user by id',
  })
  async updateField(
    @Param('id') id: string,
    @Query() field: string,
    @Body() dto: EditUserDto,
  ) {
    return this.usersService.updateField(id, field, dto[field]);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete user by id',
  })
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  // upload profile image
  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(UserGuard)
  async uploadFile(@UploadedFile() file: any, @Param('id') id: string) {
    return await this.usersService.uploadProfileImage(file, id);
  }

  //get user's forums
  @Get(':id/forums')
  @ApiOperation({
    summary: 'Get user forums',
  })
  @ApiResponse({
    status: 200,
    description: 'Get user forums',
  })
  @UseGuards(UserGuard)
  async getUserForums(@Param('id') id: string) {
    return await this.usersService.getUserForums(id);
  }
}
