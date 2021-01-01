import {
  Allow,
  IsDateString,
  IsDefined,
  Validate,
  ValidateNested,
} from "class-validator";

import { AdminPropertyPriceRequestDto } from "./AdminPropertyPriceRequestDto";
import { IsValidCategory } from "../../../validators/CategoryValidator";
import { Type } from "class-transformer";

export class AdminPropertyOverviewRequestDto {
  @IsDefined({ message: "Name is required" })
  name: string;

  @IsDefined({ message: "City is required" })
  city: string;

  @IsDefined({ message: "Sub location is required" })
  subLocation: string;

  @Allow()
  reraNumber: string;

  @Allow()
  @IsDateString()
  possessionBy: Date;

  @IsDefined({ message: "Category is required" })
  @Validate(IsValidCategory)
  category: string;

  @Allow()
  numberOfUnits: number;

  @Allow()
  usps: string[];

  @ValidateNested()
  @Type(() => AdminPropertyPriceRequestDto)
  price: AdminPropertyPriceRequestDto;
}
