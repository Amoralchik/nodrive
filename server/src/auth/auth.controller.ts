/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  UseGuards,
  Redirect,
  Res,
  Req,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get('/')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  @Redirect('http://localhost/archive')
  googleAuthRedirect(@Req() req, @Session() session) {
    return this.appService.googleLogin(req, session);
  }
}
