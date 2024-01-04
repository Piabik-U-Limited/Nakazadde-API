import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EditUserDto } from './dto/user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient,
    private cloudinary: CloudinaryService

  ) { }

  async editUser(id: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth,
        about: dto.about,
        occupation: dto.occupation,
        location: dto.location,
      },
    });
    return { message: 'User updated successfully', user };
  }

  //update one field
  async updateField(id: string, field: string, value: any) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: { [field]: value },
    });
    return { message: `${field} updated successfully`, user };
  }

  //get all users
  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        email: { select: { email: true } },
        phone: { select: { phone: true } },
        followers: { include: { followee: true } },
        followings: { include: { follower: true } },
      },
      orderBy: { joinedAt: 'desc' },
    });
  }

  //get user by id
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        email: { select: { email: true } },
        phone: { select: { phone: true } },
        followers: { include: { followee: true } },
        followings: { include: { follower: true } },
      },
    });
    return user;
  }

  //delete user
  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return { message: 'User deleted successfully', user: deletedUser };
  }


  async uploadProfileImage(file: any, id: string) {
    //check if user already has image and delete it
    const current = await this.prisma.profilePhoto.findFirst({
      where: { userId: id },
    });
    if (current) {
      await this.deteleteProfileImage(current.id, current.publicId);
    }
    const image = await this.cloudinary.uploadFile(file, 'users');
    // const profileImage =
    await this.prisma.profilePhoto.create({
      data: {
        url: image.secure_url,
        userId: id,
        publicId: image.public_id,
      },
    });

    return {
      message: `Profile image uploaded successfully`,
    };
  }

  private async deteleteProfileImage(id: string, publicId: string) {
    //delete current profile image
    await this.prisma.profilePhoto.delete({ where: { id } });
    await this.cloudinary.deleteFile(publicId, 'users');
  }
}
