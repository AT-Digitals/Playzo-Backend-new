import { AdminPropertyDeveloperDto } from "../../../dto/admin/propertyDeveloper/AdminPropertyDeveloperDto";
import { AdminPropertyDeveloperRequestDto } from "../../../dto/admin/propertyDeveloper/AdminPropertyDeveloperRequestDto";
import { PropertyDeveloper } from "../../../models/propertyDeveloper/PropertyDeveloper";
import { Service } from "typedi";

@Service()
export class AdminPropertyDeveloperService {
  public async getAllPropertyDevelopers() {
    const propertyDevelopers = await PropertyDeveloper.find();

    return propertyDevelopers.map(
      (propertyDeveloper) => new AdminPropertyDeveloperDto(propertyDeveloper)
    );
  }

  public async addNewPropertyDeveloper(
    propertyDeveloperRequest: AdminPropertyDeveloperRequestDto
  ) {
    let propertyDeveloper = new PropertyDeveloper({
      ...propertyDeveloperRequest,
    });
    propertyDeveloper = await propertyDeveloper.save();
    return new AdminPropertyDeveloperDto(propertyDeveloper);
  }
}
