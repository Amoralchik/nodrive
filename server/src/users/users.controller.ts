import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('me')
  // @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    return this.appService.me(req);
  }
}
