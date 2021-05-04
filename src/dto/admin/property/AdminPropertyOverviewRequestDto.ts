import {
  Allow,
  IsDateString,
  IsDefined,
  Validate,
  ValidateNested,
} from "class-validator";
import {
  PropertyStatus,
  PropertyType,
} from "../../../models/property/PropertyModel";

import { AdminPropertyPriceRequestDto } from "./AdminPropertyPriceRequestDto";
import { IsValidCategory } from "../../../validators/CategoryValidator";
import { IsValidPropertyDeveloper } from "../../../validators/PropertyDeveloperValidator";
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
  categories: string[];

  @IsDefined({ message: "Property Developer is required" })
  @Validate(IsValidPropertyDeveloper)
  propertyDeveloper: string;

  @Allow()
  numberOfUnits: number;

  @Allow()
  usps: string[];

  @ValidateNested()
  @Type(() => AdminPropertyPriceRequestDto)
  price: AdminPropertyPriceRequestDto;

  @IsDefined({ message: "Property Type is required" })
  propertyType: PropertyType;

  @IsDefined({ message: "Property Status is required" })
  propertyStatus: PropertyStatus;
}
