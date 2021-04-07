import { AdminError } from "../../dto/error/AdminError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Property } from "../../models/property/Property";
import { PropertyDeveloper } from "../../models/propertyDeveloper/PropertyDeveloper";
import { PropertyDto } from "../../dto/anonymous/PropertyDto";
import { PropertyPriceModal } from "../../models/property/PropertyPriceModel";
import { PropertyRequestDto } from "../../dto/anonymous/PropertyRequestDto";
import { PropertyType } from "../../models/property/PropertyModel";
import { Service } from "typedi";

@Service()
export class SearchServices {
  public async getProperties(type: PropertyType, city: string, query: string) {
    const propertyDeveloper = await this.getPropertyDeveloperByName(query);
    const properties = await Property.find({
      $or: [
        { propertyType: type },
        {
          city,
        },
        {
          reraNumber: query,
        },
        {
          subLocation: query,
        },
        {
          name: query,
        },
        {
          propertyDeveloper,
        },
      ],
    }).populate("propertyDeveloper");

    return properties.map((property) => new PropertyDto(property));
  }

  public async getPropertyDeveloperByName(name: string) {
    const propertyDeveloper = await PropertyDeveloper.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    return propertyDeveloper;
  }

  public async getProperty(propertyId: string) {
    const property = await Property.findById(propertyId).populate(
      "propertyDeveloper"
    );
    if (property) {
      return new PropertyDto(property);
    } else {
      throw new AppErrorDto(AdminError.PROPERTY_ID_DOES_NOT_EXIST);
    }
  }

  public async getSimilarProperties(propertyRequestDto: PropertyRequestDto) {
    const properties = await Property.find({
      $or: [
        { city: propertyRequestDto.city },
        { subLocation: propertyRequestDto.subLocation },
        {
          price: {
            from: propertyRequestDto.fromPrice,
            to: propertyRequestDto.toPrice,
          } as PropertyPriceModal,
        },
      ],
    });

    return properties.map((property) => new PropertyDto(property));
  }
}
