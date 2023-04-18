import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as mime from 'mime';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async createFolder(body, session) {
    const user = await this.prisma.user.findFirst({
      where: { email: session.user.email },
    });
    const folder = await this.prisma.folder.create({
      data: {
        ownerId: user.id,
        name: body.name,
      },
    });

    if (!folder) {
      throw new NotFoundException(`Failed to create folder ${body.name}`);
    }

    return folder;
  }

  async update(id: number, body): Promise<void> {
    await this.prisma.folder.update({
      where: { id },
      data: { name: body.name },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.file.deleteMany({
      where: {
        folderId: id,
      },
    });
    await this.prisma.folder.delete({ where: { id }, include: { files: {} } });
  }

  async upload(files, name, session) {
    const user = await this.prisma.user.findFirst({
      where: { email: session.user.email },
    });

    const folder = await this.prisma.folder.findFirst({
      where: { name, ownerId: user.id },
    });

    for (const file of files) {
      const { originalname: name, buffer: content } = file;
      const fileType = mime.getType(name);

      const savedFile = await this.prisma.file.create({
        data: {
          folderId: folder.id,
          accsessMails: ['my@email.com'],
          ownerId: user.id,
          name,
          content: content.toString('base64'),
          mimeType: fileType || 'other',
        },
      });
      if (savedFile) {
        console.log('saved');
      }
    }
  }
}
