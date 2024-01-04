import { Injectable } from '@nestjs/common';
import { CreateForumDto, EditForumDto } from './dto/forum.dto';
import { PrismaClient } from '@prisma/client';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ForumsService {
  constructor(
    private prisma: PrismaClient,
    private cloudinary: CloudinaryService,
  ) {}
  async createForum(dto: CreateForumDto) {
    const forum = await this.prisma.forum.create({
      data: {
        name: dto.name,
        description: dto.description,
        creatorId: dto.userId,
      },
    });

    //make creator a member and admin
    await this.prisma.member.create({
      data: {
        userId: dto.userId,
        forumId: forum.id,
        admin: { create: {} },
        status: 'Active',
      },
    });

    return { forum, message: 'Forum created successfully' };
  }

  //get all forums
  async getAllForums() {
    return await this.prisma.forum.findMany({
      include: {
        icon: { select: { url: true } },
        creator: {
          select: {
            name: true,
            id: true,
            phone: { select: { phone: true } },
            photo: { select: { url: true } },
            email: { select: { email: true } },
          },
        },
      },
    });
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
    await this.prisma.forum.update({
      where: { id },
      data: {
        [field]: value,
      },
    });
    return { message: `${field} updated successfully` };
  }

  //delete forum
  async deleteForum(id: string) {
    const deletedForum = await this.prisma.forum.delete({
      where: { id },
    });
    return { message: 'Forum deleted successfully', forum: deletedForum };
  }

  async uploadIcon(file: any, id: string) {
    //check if user already has image and delete it
    const current = await this.prisma.icon.findFirst({
      where: { forumId: id },
    });
    if (current) {
      await this.deleteIcon(current.id, current.publicId);
    }
    const image = await this.cloudinary.uploadFile(file, 'forums');
    // const profileImage =
    await this.prisma.icon.create({
      data: {
        url: image.secure_url,
        forumId: id,
        publicId: image.public_id,
      },
    });

    return {
      message: `Forum icon updated`,
    };
  }

  private async deleteIcon(id: string, publicId: string) {
    //delete current profile image
    await this.prisma.icon.delete({ where: { id } });
    await this.cloudinary.deleteFile(publicId, 'forums');
  }
}
