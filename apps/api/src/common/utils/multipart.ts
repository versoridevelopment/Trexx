import { BadRequestException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export interface ParsedFile {
  buffer: Buffer;
  filename: string;
  mimetype: string;
}

export async function parseMultipartRequest(req: FastifyRequest) {
  if (!req.isMultipart()) {
    throw new BadRequestException('La petición debe ser de tipo multipart/form-data');
  }

  const files: ParsedFile[] = [];
  const fields: Record<string, string> = {};

  const parts = req.parts();
  for await (const part of parts) {
    if ('file' in part) {
      const buffer = await streamToBuffer(part.file);
      files.push({
        buffer,
        filename: part.filename,
        mimetype: part.mimetype,
      });
    } else {
      fields[part.fieldname] = part.value as string;
    }
  }

  return { fields, files };
}
