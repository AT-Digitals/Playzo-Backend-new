import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { AdminError } from "../dto/error/AdminError";
import { PropertyDeveloper } from "../models/propertyDeveloper/PropertyDeveloper";

@ValidatorConstraint({ name: "isValidCategory", async: true })
export class IsValidPropertyDeveloper implements ValidatorConstraintInterface {
  async validate(propertyDeveloperId: string): Promise<boolean> {
    if (!propertyDeveloperId) {
      return false;
    }

    const propertyDeveloper = await PropertyDeveloper.findById(
      propertyDeveloperId
    );

    return !!propertyDeveloper;
  }

  defaultMessage(): string {
    return AdminError.PROPERTY_DEVELOPER_ID_DOES_NOT_EXIST;
  }
}
