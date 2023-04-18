import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Session,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('folders')
export class FoldersController {
  constructor(private readonly appService: FoldersService) {}

  @Post('')
  async create(@Body() body, @Session() session) {
    return this.appService.createFolder(body, session);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.appService.delete(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body): Promise<void> {
    await this.appService.update(+id, body);
  }

  @Post('upload/:name')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: any,
    @Session() session,
    @Param('name') name: string,
  ) {
    return this.appService.upload(files, name, session);
  }
}
