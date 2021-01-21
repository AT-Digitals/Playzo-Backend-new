import { CategoryModel } from "../category/CategoryModel";
import { Document } from "mongoose";
import { PropertyMediaModel } from "./PropertyMediaModel";
import { PropertyPriceModal } from "./PropertyPriceModel";
import { PropertySpecificationModal } from "./PropertySpecificationModal";

export interface PropertyModel extends Document {
  name: string;
  city: string;
  subLocation: string;
  reraNumber: string;
  possessionBy: Date;
  categories: CategoryModel["id"][] | CategoryModel[];
  numberOfUnits: number;
  usps: string[];
  price: PropertyPriceModal;
  media: PropertyMediaModel[];
  amenities: string[];
  specifications: PropertySpecificationModal;
}
