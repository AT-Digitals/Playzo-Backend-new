import multer = require("multer");
import path = require("path");

import { UploadedFile, UploadedFiles } from "routing-controllers";

import { AppError } from "../dto/error/AppError";
import { AppErrorDto } from "../dto/error/AppErrorDto";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

const getUniqueFilename = (fileName: string) => {
  const uuid = uuidv4();
  return `${uuid}_${fileName}`;
};

const diskStorage = multer.diskStorage({
  destination: (_: any, __: any, cb: any) => {
    cb(null, path.join(__dirname, "../../", "uploads"));
  },
  filename: (_: Request, file: Express.Multer.File, cb: any) => {
    cb(null, getUniqueFilename(file.originalname));
  },
});

const fileUploadOptions = ({
  allowedMimeTypes = [],
  fileSize = 1024 * 1024 * 50,
  maxFilenameLength = 255,
}: {
  allowedMimeTypes?: string[];
  fileSize?: number;
  maxFilenameLength?: number;
}) => ({
  storage: diskStorage,
  fileFilter: (_: any, file: Express.Multer.File, cb: any) => {
    if (
      allowedMimeTypes.length > 0 &&
      allowedMimeTypes.findIndex((fileType) => file.mimetype === fileType) < 0
    ) {
      cb(new AppErrorDto(AppError.UPLOAD_INVALID_FILE_TYPE));
      return;
    }
    cb(null, true);
  },
  limits: {
    fieldNameSize: maxFilenameLength,
    fileSize: fileSize,
  },
});

const imageFileTypes: string[] = [
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/svg+xml",
];

export type UploadedFile = Express.Multer.File | undefined;
export type UploadedFiles = Express.Multer.File[] | undefined;

export class UploadUtils {
  public static getUploadedUrl = (file: UploadedFile): string | undefined => {
    if (!file) {
      return undefined;
    }
    return process.env.API_URL + "/uploads/" + file.filename;
  };

  public static getUploadedUrls = (files: UploadedFiles): string[] => {
    if (!files) {
      return [];
    }
    return files
      .map((image) => UploadUtils.getUploadedUrl(image) ?? "")
      .filter((url) => url !== "");
  };
}

export const UploadedImage = (name: string) =>
  UploadedFile(name, {
    options: fileUploadOptions({
      allowedMimeTypes: imageFileTypes,
    }),
  });

export const UploadedImages = (name: string) =>
  UploadedFiles(name, {
    options: fileUploadOptions({
      allowedMimeTypes: imageFileTypes,
    }),
  });
