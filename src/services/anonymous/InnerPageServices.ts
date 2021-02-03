import { AdminError } from "../../dto/error/AdminError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { Property } from "../../models/property/Property";
import { PropertyDto } from "../../dto/anonymous/PropertyDto";
import { Service } from "typedi";

@Service()
export class InnerPageServices {
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
}
