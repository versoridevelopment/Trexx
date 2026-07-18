export abstract class IStorageRepository {
  abstract upload(
    fileBuffer: Buffer,
    filePath: string,
    mimeType: string,
    bucketName: string,
  ): Promise<string>;
}
