import { Allow } from "class-validator";

export class AdminPropertyMediaDto {
  @Allow()
  medias: Express.Multer.File[];
}
