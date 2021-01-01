import { Document } from "mongoose";

export interface PropertySpecificationValueType extends Document {
    name: string;
    value: string
}

export interface PropertySpecificationModal {
    Flooring: PropertySpecificationValueType[];
    Windows: PropertySpecificationValueType[];
    Bathroom: PropertySpecificationValueType[];
    Kitchen: PropertySpecificationValueType[];
    Electrical: PropertySpecificationValueType[];
    Fittings: PropertySpecificationValueType[];
    Others: PropertySpecificationValueType[]
}
