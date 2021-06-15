import { Get, JsonController, Param } from "routing-controllers";
import { FloorPlanService } from "../../services/anonymous/FloorPlanServices";
import { Service } from "typedi";

@JsonController("/anonymous/propertyFloorPlan")
@Service()
export class AdminPropertyFloorPlanController {
  constructor(private floorPlanService: FloorPlanService) {}

  @Get("/:propertyId/:category/:variation")
  public async getFloorPlan(
    @Param("propertyId") propertyId: string,
    @Param("category") category: string,
    @Param("variation") variation: string
  ) {
    return this.floorPlanService.getPropertyFloorPlan(
      propertyId,
      category,
      variation
    );
  }
}
