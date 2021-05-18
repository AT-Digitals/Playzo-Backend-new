import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { AdminError } from "../dto/error/AdminError";
import { Property } from "../models/property/Property";

@ValidatorConstraint({ name: "isValidProperty", async: true })
export class IsValidProperty implements ValidatorConstraintInterface {
  async validate(propertyId: string): Promise<boolean> {
    if (!propertyId) {
      return false;
    }
    const property = await Property.findById(propertyId);
    return !!property;
  }

  defaultMessage(): string {
    return AdminError.PROPERTY_ID_DOES_NOT_EXIST;
  }
}
