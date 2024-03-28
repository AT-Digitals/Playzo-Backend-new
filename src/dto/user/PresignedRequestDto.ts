import { PresignedPost } from "@aws-sdk/s3-presigned-post";

export default class PresignedRequestDto {
  uploadUrl: string;
  publicUrl: string;
  body: { [key: string]: string };

  constructor(presignedPost: PresignedPost) {
    this.uploadUrl = presignedPost.url;
    this.publicUrl =
      process.env.ASSET_PUBLIC_URL + "/" + presignedPost.fields["key"];
    this.body = presignedPost.fields;
  }
}
