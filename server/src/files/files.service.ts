import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async deleteFile(id: number): Promise<void> {
    await this.prisma.file.delete({ where: { id } });
  }

  async update(id: number, body): Promise<void> {
    await this.prisma.file.update({
      where: { id },
      data: { name: body.name },
    });
  }

  async getFile(name: string) {
    const file = await this.prisma.file.findFirst({
      where: {
        codeName: name,
      },
    });

    return file;
  }

  async all(req) {
    const sessionUser = req.session.user;
    const user = await this.prisma.user.findFirst({
      where: { email: sessionUser.email },
    });

    const files = await this.prisma.file.findMany({
      where: {
        owner: user,
      },
      select: {
        id: true,
        name: true,
        codeName: true,
        folderId: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        accsessMails: true,
        folder: false,
        owner: true,
        mimeType: true,
      },
    });
    return files;
  }
}
