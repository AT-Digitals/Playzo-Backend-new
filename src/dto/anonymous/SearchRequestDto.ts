import { Allow } from "class-validator";
import { PropertyType } from "../../models/property/PropertyModel";

export class SearchRequestDto {
  @Allow()
  city: string;

  @Allow()
  type: PropertyType;

  @Allow()
  query: string;
}
