import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  Patch,
  Put,
} from '@nestjs/common';
import { EditForumDto, CreateForumDto } from './dto/forum.dto';
import { ForumsService } from './forums.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MembersService } from '../members/members.service';
@Controller('forums')
@ApiTags('Forums')
export class ForumsController {
  constructor(private forumsService: ForumsService, private membersService: MembersService) {}
  //create forum
  @Post()
  @ApiOperation({
    summary: 'Create forum',
  })
  @ApiResponse({ status: 200, description: 'Create forum' })
  @ApiBody({

    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Forum name',
          description: 'Forum name',
        },
        description: {
          type: 'string',
          example: 'Forum description',
          description: 'Forum description',
        },
        creatorId: {
          type: 'string',
          example: '4d9c815a-8665-4c1e-8802-486df094a98b',
          description: 'Creator Id',
        }
      },
    }
  })
  async createForum(@Body() dto: CreateForumDto) {
    return await this.forumsService.createForum(dto);
  }
  //get all forums

  @Get()
  @ApiOperation({ summary: 'Get all forums' })
  @ApiResponse({ status: 200, description: 'Get all forums' })
  async getAllForums() {
    return await this.forumsService.getAllForums();
  }

  //edit forum
  @Put(':id')
  @ApiOperation({
    summary: 'Edit forum',
  })
  @ApiResponse({ status: 200, description: 'Edit forum' })
  @ApiBody({
  
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Forum name',
          description: 'Forum name',
        },
        description: {
          type: 'string',
          example: 'Forum description',
          description: 'Forum description',
        },
      },
    },
  })
  async editForum(@Param('id') id: string, @Body() dto: EditForumDto) {
    return await this.forumsService.editForum(id, dto);
  }

  //edit Field
  @Patch(':id')
  @ApiOperation({
    summary: 'Edit field',
  })
  @ApiResponse({ status: 200, description: 'Edit field' })
  @ApiBody({
  
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Forum name',
          description: 'Forum name',
        },
        description: {
          type: 'string',
          example: 'Forum description',
          description: 'Forum description',
        },
      },
    },
  })
  async editField(
    @Param('id') id: string,
    @Query('field') field: string,
    @Body() dto: EditForumDto,
  ) {
    return await this.forumsService.editField(id, field, dto[field]);
  }

  //delete forum
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete forum',
  })
  @ApiResponse({ status: 200, description: 'Delete forum' })
  async deleteForum(@Param('id') id: string) {
    return await this.forumsService.deleteForum(id);
  }

  //join forum
  @Get(':id/join/:user_id')
  @ApiOperation({
    summary: 'Join forum',
  })
  @ApiResponse({ status: 200, description: 'Join forum' })
  async joinForum(@Param('id') id: string, @Param('user_id') user_id: string) {
    return await this.membersService.joinForum(id, user_id);
  }
}
