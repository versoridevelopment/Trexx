import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getByKey(key: string) {
    const setting = await this.prisma.store_settings.findUnique({
      where: { key },
    });

    if (!setting) {
      return null;
    }

    return setting.value;
  }

  async updateByKey(key: string, value: any) {
    const setting = await this.prisma.store_settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return setting;
  }
}
