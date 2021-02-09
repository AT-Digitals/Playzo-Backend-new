import { AdminError } from "../../../dto/error/AdminError";
import { AdminPropertyDeveloperDto } from "../../../dto/admin/propertyDeveloper/AdminPropertyDeveloperDto";
import { AdminPropertyDeveloperRequestDto } from "../../../dto/admin/propertyDeveloper/AdminPropertyDeveloperRequestDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
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

  public async updateImage(propertyDeveloperId: string, image: string) {
    let propertyDeveloper = await this.findById(propertyDeveloperId);
    propertyDeveloper.image = image;
    propertyDeveloper = await propertyDeveloper.save();
    return new AdminPropertyDeveloperDto(propertyDeveloper);
  }

  public async updatePropertyDeveloper(
    propertyDeveloperId: string,
    updatedPropertyDeveloper: AdminPropertyDeveloperRequestDto
  ) {
    let propertyDeveloper = await this.findById(propertyDeveloperId);
    propertyDeveloper.name = updatedPropertyDeveloper.name;
    propertyDeveloper.experience = updatedPropertyDeveloper.experience;
    propertyDeveloper.totalProjects = updatedPropertyDeveloper.totalProjects;
    propertyDeveloper.content = updatedPropertyDeveloper.content;
    propertyDeveloper = await propertyDeveloper.save();
    return new AdminPropertyDeveloperDto(propertyDeveloper);
  }

  public async getPropertyDeveloper(propertyDeveloperId: string) {
    const propertyDeveloper = await this.findById(propertyDeveloperId);
    return new AdminPropertyDeveloperDto(propertyDeveloper);
  }

  private async findById(propertyDeveloperId: string) {
    const propertyDeveloper = await PropertyDeveloper.findById(
      propertyDeveloperId
    );
    if (!propertyDeveloper) {
      throw new AppErrorDto(AdminError.PROPERTY_DEVELOPER_ID_DOES_NOT_EXIST);
    }
    return propertyDeveloper;
  }
}
