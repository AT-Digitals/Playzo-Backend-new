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
    const properties = await Property.find().populate("categories");
    return properties.map((property) => new AdminPropertyOverviewDto(property));
  }

  public async addNewProperty(
    propertyRequest: AdminPropertyOverviewRequestDto
  ) {
    let property = new Property({ ...propertyRequest });
    property = await property.save();
    return new AdminPropertyOverviewDto(property);
  }

  public async getPropertyDetails(propertyId: string) {
    const property = await this.findByPropertyId(propertyId);
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
    property.categories = propertyRequest.categories as any;
    property.numberOfUnits = propertyRequest.numberOfUnits;
    property.usps = propertyRequest.usps;
    property.price = propertyRequest.price;
    property.propertyDeveloper = propertyRequest.propertyDeveloper;
    property = await property.save();
    property = await property
      .populate("categories")
      .populate("propertyDeveloper")
      .execPopulate();
    return new AdminPropertyOverviewDto(property);
  }

  public async findByPropertyId(propertyId: string) {
    const property = await Property.findById(propertyId)
      .populate("categories")
      .populate("propertyDeveloper");
    if (!property) {
      throw new AppErrorDto(AdminError.PROPERTY_ID_DOES_NOT_EXIST);
    }
    return property;
  }
}
