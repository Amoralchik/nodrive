import { Controller, Get, Req, Session } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('me')
  async me(@Req() req) {
    return this.appService.me(req);
  }

  @Get('archive')
  async archive(@Req() req) {
    return this.appService.archive(req);
  }

  @Get('logout')
  async logout(@Session() session) {
    return this.appService.logout(session);
  }
}
