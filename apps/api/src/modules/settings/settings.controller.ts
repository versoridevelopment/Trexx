import { Controller, Get, Post, Put, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';
import { SettingsService } from './settings.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { parseMultipartRequest } from '../../common/utils/multipart';
import { StorageService } from '../storage/storage.service';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly storageService: StorageService
  ) {}

  @Get(':key')
  public async getByKey(@Param('key') key: string) {
    const value = await this.settingsService.getByKey(key);
    return { value };
  }

  @Put(':key')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  public async updateByKey(@Param('key') key: string, @Body() body: any) {
    return this.settingsService.updateByKey(key, body.value);
  }

  @Post('upload')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  public async uploadFile(@Req() req: FastifyRequest) {
    const { fields, files } = await parseMultipartRequest(req);
    
    if (!files || files.length === 0) {
      throw new Error('No file uploaded');
    }

    const file = files[0];
    const folder = fields.folder || 'home/hero';
    
    const url = await this.storageService.uploadFile(
      file.buffer,
      file.filename,
      file.mimetype,
      folder,
      'store-assets'
    );

    return { url };
  }
}
