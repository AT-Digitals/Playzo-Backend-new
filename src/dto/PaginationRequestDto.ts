import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export default class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Please provide a valid page" })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Please provide a valid limit" })
  limit?: number;
}
