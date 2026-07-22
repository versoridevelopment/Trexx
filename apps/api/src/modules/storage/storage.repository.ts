import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IStorageRepository } from './storage.repository.interface';

@Injectable()
export class StorageRepository implements IStorageRepository {
  private supabase: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const supabaseUrl =
      this.config.get<string>('supabase.url') || process.env.SUPABASE_URL;

    // Use service_role key to bypass RLS for server-side uploads
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_KEY ||
      this.config.get<string>('supabase.serviceKey') ||
      process.env.SUPABASE_ANON_KEY ||
      this.config.get<string>('supabase.anonKey');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration (url, serviceKey) is missing');
    }

    this.supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  async upload(
    fileBuffer: Buffer,
    filePath: string,
    mimeType: string,
    bucketName: string,
  ): Promise<string> {
    const { error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      throw new Error(
        `Failed to upload file to Supabase Storage: ${error.message}`,
      );
    }

    const {
      data: { publicUrl },
    } = this.supabase.storage.from(bucketName).getPublicUrl(filePath);

    return publicUrl;
  }
}
