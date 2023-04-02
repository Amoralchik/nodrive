import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  googleLogin(req, session) {
    if (!req.user) {
      return 'No user from google';
    }
    session.user = req.user;
    return session;
  }
}
