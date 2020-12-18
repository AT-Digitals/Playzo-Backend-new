import {
    Allow,
} from "class-validator";

export class AdminPropertyMediaDto {
    @Allow()
    id: string;

    @Allow()
    medias: Express.Multer.File[]
}