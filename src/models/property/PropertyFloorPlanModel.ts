import { Document } from "mongoose";

export interface Area {
  sqFt: string;
  details: string;
}

export interface FloorPlan extends Document {
  image: string;
  area: Area;
  noOfUnits: string;
  agreementPrice: string;
}

export enum CategoryType {
  Villa = "Villa",
  Appartment = "Appartment",
  Plot = "Plot",
}

export interface PropertyFloorPlanModel extends Document {
  category: CategoryType;
  variation: string;
  floorPlans: FloorPlan[];
}
