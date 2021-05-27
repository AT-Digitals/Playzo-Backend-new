import {
  CategoryType,
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

export class FloorPlanBTNShowInfoDto {
  Appartment: {
    "1 BHK": boolean;
    "2 BHK": boolean;
    "3 BHK": boolean;
    "4 BHK": boolean;
    "5 BHK+": boolean;
  };
  Villa: {
    "1 BHK": boolean;
    "2 BHK": boolean;
    "3 BHK": boolean;
    "4 BHK": boolean;
    "5 BHK+": boolean;
  };

  constructor(floorPlan: PropertyFloorPlanModel[]) {
    const Appartment: any = {},
      Villa: any = {};

    for (const floor of floorPlan) {
      if (floor.category === CategoryType.Appartment) {
        Appartment[floor.variation] =
          floor.floorPlans.length >= 1 ? true : false;
      } else if (floor.category === CategoryType.Villa) {
        Villa[floor.variation] = floor.floorPlans.length >= 1 ? true : false;
      }
    }

    this.Appartment = Appartment;
    this.Villa = Villa;
  }
}
