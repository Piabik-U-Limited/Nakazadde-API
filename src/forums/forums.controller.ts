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
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EditForumDto, CreateForumDto } from './dto/forum.dto';
import { ForumsService } from './forums.service';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MembersService } from '../members/members.service';
import { ForumGuard } from './guards/forum.guard';
import { UserGuard } from '../users/guards/user.guard';
import { MemberGuard } from '../members/guards/member.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('forums')
@ApiTags('Forums')
export class ForumsController {
  constructor(
    private forumsService: ForumsService,
    private membersService: MembersService,
  ) {}
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
        userId: {
          type: 'string',
          example: '61b9c920-6fe5-4313-bc03-341020dd6851',
          description: 'Creator Id',
        },
      },
    },
  })
  @UseGuards(UserGuard)
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
  @UseGuards(ForumGuard)
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
  @UseGuards(ForumGuard)
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
  @UseGuards(ForumGuard)
  async deleteForum(@Param('id') id: string) {
    return await this.forumsService.deleteForum(id);
  }

  // upload profile image
  @Post(':id/icon')
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
  @UseGuards(ForumGuard)
  async uploadFile(@UploadedFile() file: any, @Param('id') id: string) {
    return await this.forumsService.uploadIcon(file, id);
  }

  //join forum
  @Get(':id/join/:user_id')
  @ApiOperation({
    summary: 'Join forum',
  })
    
  @ApiResponse({ status: 200, description: 'Join forum' })
  @UseGuards(ForumGuard,)
  async joinForum(@Param('id') id: string, @Param('user_id') user_id: string) {
    return await this.membersService.joinForum(id, user_id);
  }

  //get members of a forum
  @Get(':id/members')
  @ApiOperation({
    summary: 'Get members of a forum',
  })
  @ApiResponse({ status: 200, description: 'Get members of a forum' })
  @UseGuards(ForumGuard)
  async getMembers(@Param('id') id: string) {
    return await this.membersService.getAllMembers(id);
  }
  @Get(':id/members/:member_id')
  @ApiOperation({
    summary: 'Get member of a forum',
  })
  @ApiResponse({ status: 200, description: 'Get member of a forum' })
  @UseGuards(ForumGuard, MemberGuard)
  async getMember(
    @Param('id') id: string,
    @Param('member_id') memberId: string,
  ) {
    return await this.membersService.getMember(memberId);
  }

  //get pending members of a forum
  @Get(':id/members/pending')
  @ApiOperation({
    summary: 'Get pending members of a forum',
  })
  @ApiResponse({ status: 200, description: 'Get pending members of a forum' })
  @UseGuards(ForumGuard)
  async getPendingMembers(@Param('id') id: string) {
    return await this.membersService.getAllPendingMembers(id);
  }

  //approve member
  @Patch(':id/members/:member_id/approve')
  @ApiOperation({
    summary: 'Approve member',
  })
  @ApiResponse({ status: 200, description: 'Approve member' })
  @UseGuards(ForumGuard, MemberGuard)
  async approveMember(
    @Param('id') id: string,
    @Param('member_id') memberId: string,
  ) {
    return await this.membersService.acceptMember(memberId);
  }

  //decline member
  @Patch(':id/members/:member_id/decline')
  @ApiOperation({
    summary: 'Decline member',
  })
  @ApiResponse({ status: 200, description: 'Decline member' })
  @UseGuards(ForumGuard, MemberGuard)
  async declineMember(
    @Param('id') id: string,
    @Param('member_id') memberId: string,
  ) {
    return await this.membersService.declineMember(memberId);
  }

  //remove member
  @Delete(':id/members/:member_id/remove')
  @ApiOperation({
    summary: 'Remove member',
  })
  @ApiResponse({ status: 200, description: 'Remove member' })
  @UseGuards(ForumGuard, MemberGuard)
  async removeMember(
    @Param('id') id: string,
    @Param('member_id') memberId: string,
  ) {
    return await this.membersService.removeMember(memberId);
  }
}
