import { CategoryType } from "../../../models/property/PropertyFloorPlanModel";
import { IsDefined } from "class-validator";

export class AdminPropertyFloorPlanRequestDto {
  @IsDefined({ message: "Category is required" })
  category: CategoryType;

  @IsDefined({ message: "variation is required" })
  variation: string;

  @IsDefined({ message: "sq ft is required" })
  sqFt: string;

  @IsDefined({ message: "Details is required" })
  details: string;

  @IsDefined({ message: "No of unit is required" })
  noOfUnits: string;

  @IsDefined({ message: "Agreement Price is rquired" })
  agreementPrice: string;

  @IsDefined({ message: "Property Id is required" })
  propertyId: string;
}
