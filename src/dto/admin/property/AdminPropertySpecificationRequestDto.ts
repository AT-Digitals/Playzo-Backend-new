import {
    IsDefined,
    Validate,
    ValidateNested
} from "class-validator";

import { IsValidSpecificationCategory } from "../../../validators/specificationValidator";
import { PropertySpecificationModal } from "../../../models/property/PropertySpecificationModal";
import {PropertySpecificationRequestDto} from "./PropertySpecificationRequestDto"
import {PropertySpecifictionDto} from "./PropertySpecificationDto";
import { Type } from "class-transformer";

export class AdminPropertyAddSpecificationDto {
    @IsDefined({ message: "Category is required" })
    @Validate(IsValidSpecificationCategory)
    category: keyof PropertySpecificationModal

    @ValidateNested()
    @Type(() => PropertySpecificationRequestDto)
    data: PropertySpecifictionDto[]
}

export class AdminPropertyDeleteSpecificationDto {
    @IsDefined({ message: "Category is required" })
    @Validate(IsValidSpecificationCategory)
    category: keyof PropertySpecificationModal

    @IsDefined({ message: "Id is required" })
    id: string
}