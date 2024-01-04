import { Injectable } from '@nestjs/common';
import { CreateForumDto, EditForumDto } from './dto/forum.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ForumsService {
  constructor(private prisma: PrismaClient) {}
  async createForum(dto: CreateForumDto) {
    const forum = await this.prisma.forum.create({
      data: {
        name: dto.name,
        description: dto.description,
        creatorId: dto.creatorId,
      },
    });

    //make creator a member and admin
    await this.prisma.member.create({
      data: {
        userId: dto.creatorId,
        forumId: forum.id,
        
      },
    })
    return { forum, message: 'Forum created successfully' };
  }

  //get all forums
  async getAllForums() {
    return await this.prisma.forum.findMany();
  }

  //get one forum
  async getOneForum(id: string) {
    return await this.prisma.forum.findUnique({
      where: { id },
    });
  }

  //edit forum
  async editForum(id: string, dto: EditForumDto) {
    const forum = await this.prisma.forum.update({
      where: { id },
      data: {
        ...dto,
      },
    });
    return { forum, message: 'Forum updated successfully' };
  }

  //edit Field
  async editField(id: string, field: string, value: any) {
    return await this.prisma.forum.update({
      where: { id },
      data: {
        [field]: value,
      },
    });
  }

  //delete forum
  async deleteForum(id: string) {
    const deletedForum = await this.prisma.forum.delete({
      where: { id },
    });
    return { message: 'Forum deleted successfully', forum: deletedForum };
  }
}
