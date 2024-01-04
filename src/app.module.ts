import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { ForumsModule } from './forums/forums.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [AuthModule, MailModule, UsersModule, ForumsModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
