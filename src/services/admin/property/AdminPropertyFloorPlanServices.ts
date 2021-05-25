import {
  CategoryType,
  FloorPlan,
  PropertyFloorPlanModel,
} from "../../../models/property/PropertyFloorPlanModel";

import { AdminError } from "../../../dto/error/AdminError";
import { AdminFloorPlanDto } from "../../../dto/admin/property/AdminPropertyFloorPlanDto";
import { AdminPropertiesOverviewService } from "./AdminPropertiesOverviewService";
import { AdminPropertyFloorPlanRequestDto } from "../../../dto/admin/property/AdminPropertyFloorPlanRequetDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Service } from "typedi";

@Service()
export class AdminPropertyFloorPlanService {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}

  public async addPropertyFloorPlan(
    floorPlanRequestDto: AdminPropertyFloorPlanRequestDto
  ) {
    let property = await this.adminPropertyOverviewService.findByPropertyId(
      floorPlanRequestDto.propertyId
    );

    const floorPlan = property.floorPlan.find((floor) => {
      if (floorPlanRequestDto.category === CategoryType.Plot) {
        return floor.category === floorPlanRequestDto.category;
      } else {
        return (
          floor.category === floorPlanRequestDto.category &&
          floor.variation === floorPlanRequestDto.variation
        );
      }
    });

    const newFloorPlan: FloorPlan = {
      image: "",
      area: {
        sqFt: floorPlanRequestDto.sqFt,
        details: floorPlanRequestDto.details,
      },
      noOfUnits: floorPlanRequestDto.noOfUnits,
      agreementPrice: floorPlanRequestDto.agreementPrice,
    } as FloorPlan;

    if (floorPlan) {
      floorPlan.floorPlans = [...floorPlan.floorPlans, newFloorPlan];
    } else {
      property.floorPlan = [
        ...property.floorPlan,
        {
          category: floorPlanRequestDto.category,
          variation: floorPlanRequestDto.variation,
          floorPlans: [newFloorPlan],
        } as PropertyFloorPlanModel,
      ];
    }

    property = await property.save();

    return property.floorPlan[0].floorPlans.map(
      (floor) => new AdminFloorPlanDto(floor)
    );
  }

  public async addFloorPlanImage(
    propertyId: string,
    floorPlanId: string,
    category: string,
    variation: string,
    image: string
  ) {
    let property = await this.adminPropertyOverviewService.findByPropertyId(
      propertyId
    );

    const floorPlans = property.floorPlan.find((floor) => {
      if (category === CategoryType.Plot) {
        return floor.category === category;
      } else {
        return floor.category === category && floor.variation === variation;
      }
    });

    const floorPlan = floorPlans?.floorPlans.find(
      (floor) => floor.id === floorPlanId
    );

    if (!floorPlan) {
      throw new AppErrorDto(AdminError.FLOOR_PLAN_DOES_NOT_EXIST);
    }

    floorPlan.image = image;

    property = await property.save();

    return property.floorPlan[0].floorPlans.map(
      (floor) => new AdminFloorPlanDto(floor)
    );
  }

  public async deletePropertyFloorPlan(
    propertyId: string,
    floorPlanId: string,
    category: string,
    variation: string
  ) {
    let property = await this.adminPropertyOverviewService.findByPropertyId(
      propertyId
    );

    const floorPlans = property.floorPlan.find((floor) => {
      if (category === CategoryType.Plot) {
        return floor.category === category;
      } else {
        return floor.category === category && floor.variation === variation;
      }
    });

    if (floorPlans) {
      floorPlans.floorPlans = floorPlans?.floorPlans.filter(
        (floor) => floor.id !== floorPlanId
      );

      property = await property.save();
    }

    return property.floorPlan[0].floorPlans.map(
      (floor) => new AdminFloorPlanDto(floor)
    );
  }

  public async getPropertyFloorPlan(
    propertyId: string,
    category: string,
    variation: string,
    getOnlyWithCategory = false
  ) {
    const property = await this.adminPropertyOverviewService.findByPropertyId(
      propertyId
    );

    const floorPlan = property.floorPlan.find((floor) => {
      if (category === CategoryType.Plot || getOnlyWithCategory) {
        return floor.category === category;
      } else {
        return floor.category === category && floor.variation === variation;
      }
    });

    return floorPlan?.floorPlans.map((floor) => new AdminFloorPlanDto(floor));
  }
}
