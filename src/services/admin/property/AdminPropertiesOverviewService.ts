import { AdminError } from "../../../dto/error/AdminError";
import { AdminPropertyDetailedDto } from "../../../dto/admin/property/AdminPropertyDetailedDto";
import { AdminPropertyOverviewDto } from "../../../dto/admin/property/AdminPropertyOverviewDto";
import { AdminPropertyOverviewRequestDto } from "../../../dto/admin/property/AdminPropertyOverviewRequestDto";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { Property } from "../../../models/property/Property";
import { Service } from "typedi";

@Service()
export class AdminPropertiesOverviewService {
  public async getAllProperties() {
    const properties = await Property.find().populate("category");
    return properties.map(property => new AdminPropertyOverviewDto(property));
  }

  public async addNewProperty(
    propertyRequest: AdminPropertyOverviewRequestDto
  ) {
    let property = new Property({ ...propertyRequest });
    property = await property.save();
    return new AdminPropertyOverviewDto(property);
  }

  public async getPropertyDetails(propertyId: string) {
    let property = await this.findByPropertyId(propertyId);
    property = await property.populate("category").execPopulate();
    return new AdminPropertyDetailedDto(property);
  }

  public async updatePropertyOverview(
    propertyId: string,
    propertyRequest: AdminPropertyOverviewRequestDto
  ) {
    let property = await this.findByPropertyId(propertyId);
    property.name = propertyRequest.name;
    property.city = propertyRequest.city;
    property.subLocation = propertyRequest.subLocation;
    property.reraNumber = propertyRequest.reraNumber;
    property.possessionBy = propertyRequest.possessionBy;
    property.category = propertyRequest.category;
    property.numberOfUnits = propertyRequest.numberOfUnits;
    property.usps = propertyRequest.usps;
    property.price = propertyRequest.price;
    property = await property.save();
    property = await property.populate("category").execPopulate();
    return new AdminPropertyOverviewDto(property);
  }

  private async findByPropertyId(propertyId: string) {
    const property = await Property.findById(propertyId).populate("category");
    if (!property) {
      throw new AppErrorDto(AdminError.PROPERTY_ID_DOES_NOT_EXIST);
    }
    return property;
  }
}
