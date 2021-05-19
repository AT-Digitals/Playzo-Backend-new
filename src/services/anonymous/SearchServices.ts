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
    let properties = await Property.find().populate("propertyDeveloper");

    if (type) {
      //filter properties based on Type
      properties = properties
        .filter((property) => {
          if (
            property.propertyType &&
            property.propertyType.toLowerCase().trim() ===
              type.toLowerCase().trim()
          ) {
            return property;
          }
          return null;
        })
        .filter(Boolean);
    }

    if (city && city !== "") {
      //filter properties based on city
      properties = properties
        .filter((property) => {
          if (
            property.city &&
            property.city.toLowerCase().trim() === city.toLowerCase().trim()
          ) {
            return property;
          }
          return null;
        })
        .filter(Boolean);
    }

    if (query && query !== "") {
      //filter properties based on name or property developer or sub location or city  or rera numbr
      query = query.toLowerCase().trim();
      properties = properties
        .filter((property) => {
          if (
            (property.propertyDeveloper.name &&
              property.propertyDeveloper.name
                .toLowerCase()
                .trim()
                .includes(query)) ||
            property.name.toLowerCase().trim().includes(query) ||
            property.subLocation.toLowerCase().trim().includes(query) ||
            property.reraNumber.toLowerCase().trim() === query ||
            property.city.toLowerCase().trim().includes(query)
          ) {
            return property;
          }
          return null;
        })
        .filter(Boolean);
    }

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
