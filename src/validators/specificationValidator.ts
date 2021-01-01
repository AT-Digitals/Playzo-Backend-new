import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

import { AdminError } from "../dto/error/AdminError";
import { PropertySpecificationModal } from "../models/property/PropertySpecificationModal";

@ValidatorConstraint({ name: "isValidSpecificationCategory", async: true })
export class IsValidSpecificationCategory implements ValidatorConstraintInterface {
    validate(category: keyof PropertySpecificationModal): boolean {

        const categories = ["Flooring", "Windows", "Bathroom", "Kitchen", "Electrical", "Fittings", "Others"];

        return categories.includes(category);
    }

    defaultMessage(): string {
        return AdminError.SPECIFICATION_CATEGORY_NOT_VALID;
    }
}
