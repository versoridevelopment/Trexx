import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const supabaseUrl =
      this.config.get<string>('supabase.url') ||
      process.env.SUPABASE_URL;

    // Use service_role key to bypass RLS for server-side uploads
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_KEY ||
      this.config.get<string>('supabase.serviceKey') ||
      process.env.SUPABASE_ANON_KEY ||
      this.config.get<string>('supabase.anonKey');

    console.log('[StorageService] Using key role:', supabaseServiceKey?.substring(0, 50) + '...');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration (url, serviceKey) is missing');
    }

    this.supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folder = 'products',
    bucketName = 'store-assets'
  ): Promise<string> {
    const fileExt = fileName.split('.').pop() || '';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${uniqueName}`;

    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload file to Supabase Storage: ${error.message}`);
    }

    const { data: { publicUrl } } = this.supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;
  }
}
