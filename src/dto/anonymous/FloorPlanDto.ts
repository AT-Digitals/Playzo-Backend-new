import {
  FloorPlan,
  PropertyFloorPlanModel,
} from "../../models/property/PropertyFloorPlanModel";

export class FloorPlanDto {
  image: string;
  area: {
    sqFt: string;
    details: string;
  };
  noOfUnits: string;
  agreementPrice: string;
  id: string;

  constructor(floorPlan: FloorPlan) {
    this.id = floorPlan.id;
    this.image = floorPlan.image;
    this.area = {
      sqFt: floorPlan.area.sqFt,
      details: floorPlan.area.details,
    };
    this.noOfUnits = floorPlan.noOfUnits;
    this.agreementPrice = floorPlan.agreementPrice;
  }
}

export class FloorPlanOverviewDto {
  category: string;
  variation: string;
  floorPlans: FloorPlanDto[];

  constructor(floorPlan: PropertyFloorPlanModel) {
    this.category = floorPlan.category;
    this.variation = floorPlan.variation;
    this.floorPlans = floorPlan.floorPlans.map(
      (floor) => new FloorPlanDto(floor)
    );
  }
}
