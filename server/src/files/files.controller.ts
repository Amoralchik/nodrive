import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import * as sharp from 'sharp';
import * as Jimp from 'jimp';
import { promisify } from 'util';
import * as fs from 'fs';
import { exec } from 'child_process';
import * as path from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly appService: FilesService) {}

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this.appService.deleteFile(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body): Promise<void> {
    await this.appService.update(+id, body);
  }

  @Get('all')
  async all(@Req() req) {
    return this.appService.all(req);
  }

  @Get(':name')
  async getFile(
    @Param('name') name: string,
    @Res() response: Response,
    @Query('full') full,
    @Query('download') download,
  ) {
    const file = await this.appService.getFile(name.split('.')[0]);
    const buffer = Buffer.from(file.content, 'base64');

    if (!file) {
      return response.status(404).send('File not found');
    }

    if (download === 'true') {
      response.setHeader('Content-Type', file.mimeType);
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="${file.name}"`,
      );
      return response.send(buffer);
    }

    if (full === 'true') {
      if (
        file.mimeType !== 'other' &&
        file.mimeType !== 'application/javascript'
      ) {
        response.setHeader('Content-Type', file.mimeType);
        response.setHeader(
          'Content-Disposition',
          `attachment; filename="${file.name}"`,
        );
        return response.send(buffer);
      }
      response.setHeader('Content-Type', 'image/png');

      const imagePath = path.join(
        process.cwd(),
        'public',
        'No_Image_Available.jpg',
      );
      const notAvailable = await sharp(imagePath)
        .png()
        .resize({
          height: 200,
          width: 200,
        })
        .toBuffer();
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="No_Image_Available.jpg"`,
      );

      return response.send(notAvailable);
    }

    let semiTransparentRedPng;
    if (file.mimeType.includes('video')) {
      const tempFilePath = `./temp/${file.codeName}.mp4`;

      await promisify(fs.writeFile)(tempFilePath, buffer);

      // Generate the preview image using FFmpeg
      const command = `ffmpeg -i ${tempFilePath} -ss 00:00:05 -vframes 1 -vf scale=200:-1 -q:v 2 -f image2pipe -`;
      const { stdout } = await promisify(exec)(command, {
        encoding: 'buffer',
      });
      const video = await Jimp.read(stdout);

      semiTransparentRedPng = await video
        .clone()
        .scaleToFit(200, 200)
        .getBufferAsync(Jimp.MIME_PNG);
    } else if (file.mimeType.includes('image')) {
      semiTransparentRedPng = await sharp(buffer)
        .png()
        .resize({
          height: 200,
          width: 200,
        })
        .toBuffer();
    } else {
      const imagePath = path.join(
        process.cwd(),
        'public',
        'No_Image_Available.jpg',
      );
      semiTransparentRedPng = await sharp(imagePath)
        .png()
        .resize({
          height: 200,
          width: 200,
        })
        .toBuffer();
    }

    response.setHeader('Content-Type', file.mimeType);
    response.setHeader('Content-Disposition', `inline; filename="${name}"`);

    response.send(semiTransparentRedPng);
  }
}
