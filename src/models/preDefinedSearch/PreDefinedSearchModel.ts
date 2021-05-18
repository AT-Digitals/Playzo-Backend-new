import { Document } from "mongoose";
import { PropertyModel } from "../property/PropertyModel";

export interface PreDefinedSearchModel extends Document {
  name: string;
  image: string;
  properties: PropertyModel["id"][] | PropertyModel[];
  order: number;
}
