import AppConstants from "../../config/AppConstants";
import { AppError } from "../../dto/error/AppError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import RandomUtils from "../../utils/RandomUtils";
import { S3Client } from "@aws-sdk/client-s3";
import { Service } from "typedi";
import StringUtils from "../../utils/StringUtils";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
@Service()
export default class UploadService {
  private static s3Client = new S3Client({
    region: process.env.AWS_ASSET_BUCKET_REGION,
  });

  private static assetBucketName = process.env.AWS_ASSET_BUCKET_NAME ?? "";

  public async getPresignedUrl(path: string, name: string, type?: string) {
    this.checkBucketName();
    const key = RandomUtils.generateCode();
    const expiresInMinutes = 10;
    return await createPresignedPost(UploadService.s3Client, {
      Bucket: UploadService.assetBucketName,
      Key: `${path}/${key}/${StringUtils.encodeAsUri(name)}`,
      Expires: expiresInMinutes * 60,
      Conditions: [
        ["starts-with", "$Content-Type", type ?? ""],
        ["content-length-range", 0, AppConstants.ATTACHMENT_MAX_FILE_SIZE],
      ],
    });
  }

  private checkBucketName() {
    if (!UploadService.assetBucketName) {
      console.error("Please configure S3 asset bucket url in env file");
      throw new AppErrorDto(AppError.INTERNAL_ERROR);
    }
    const publicUrl = process.env.ASSET_PUBLIC_URL;
    if (!publicUrl) {
      console.error("Please configure asset public url in env file");
      throw new AppErrorDto(AppError.INTERNAL_ERROR);
    }
  }
}
