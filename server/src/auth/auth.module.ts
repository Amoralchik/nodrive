import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  imports: [PassportModule.register({ session: true })],
  providers: [AuthService, GoogleStrategy, SessionSerializer, PrismaService],
})
export class AuthModule {}
