import { CategoryModel } from "../category/CategoryModel";
import { Document } from "mongoose";
import { PropertyPriceModal } from "./PropertyPriceModel";

export interface PropertyModel extends Document {
  name: string;
  city: string;
  subLocation: string;
  reraNumber: string;
  possessionBy: Date;
  category: CategoryModel["id"];
  numberOfUnits: number;
  usps: string[];
  price: PropertyPriceModal;
}
