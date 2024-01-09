import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

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
