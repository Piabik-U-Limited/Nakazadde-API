import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MembersService {
    constructor(private prisma: PrismaClient) {

    }
    async joinForum( forumId: string, userId: string,) {
        return await this.prisma.member.create({
            data: {userId,forumId}
        })
    }

    async getAllMembers(forumId: string) {
        return await this.prisma.member.findMany({
            where: {forumId}
        })
        
    }

    async removeMember(id: string, forumId: string) {
        const removedMember = await this.prisma.member.delete({
            where: { id },
            include : {user: {select: {name: true}}}
        })
        return `${removedMember.user.name} removed `
        
    }
    
}
