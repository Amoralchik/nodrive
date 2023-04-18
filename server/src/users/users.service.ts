import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async me(req) {
    const sessionUser = req.session.user;
    if (!sessionUser) return;

    const user = await this.prisma.user.upsert({
      where: {
        email: sessionUser.email,
      },
      create: {
        email: sessionUser.email,
        name: `${sessionUser.firstName} ${sessionUser.lastName}`,
        picture: sessionUser.picture,
        Folders: {
          create: {
            name: 'All',
          },
        },
      },
      update: {},
    });
    return user;
  }

  async logout(session) {
    return await this.prisma.session.delete({
      where: { id: session.id },
    });
  }

  async archive(req) {
    const sessionUser = req.session.user;
    const user = await this.prisma.user.findFirst({
      where: { email: sessionUser.email },
    });
    const folders = await this.prisma.folder.findMany({
      where: {
        owner: user,
      },
    });
    return folders;
  }
}
