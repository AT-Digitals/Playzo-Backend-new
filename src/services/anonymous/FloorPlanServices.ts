import { AdminPropertiesOverviewService } from "../admin/property/AdminPropertiesOverviewService";
import { FloorPlanDto } from "../../dto/anonymous/FloorPlanDto";
import { Service } from "typedi";

@Service()
export class FloorPlanService {
  constructor(
    private adminPropertyOverviewService: AdminPropertiesOverviewService
  ) {}

  public async getPropertyFloorPlan(
    propertyId: string,
    category: string,
    variation: string
  ) {
    const property = await this.adminPropertyOverviewService.findByPropertyId(
      propertyId
    );

    const floorPlan = property.floorPlan.find(
      (floor) => floor.category === category && floor.variation === variation
    );

    return floorPlan?.floorPlans.map((floor) => new FloorPlanDto(floor));
  }
}
