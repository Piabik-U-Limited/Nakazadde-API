import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
