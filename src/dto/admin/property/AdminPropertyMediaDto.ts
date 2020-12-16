import {
    Allow,
} from "class-validator";

export class AdminPropertyMediaDto {
    @Allow()
    id: string;

    @Allow()
    desktopImage: Express.Multer.File[]
}