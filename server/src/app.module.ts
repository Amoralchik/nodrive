import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth/google.strategy';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, GoogleStrategy],
})
export class AppModule {
  static hot: any;
}
