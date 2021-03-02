import { IsDefined } from "class-validator";

export class PropertyRequestDto {
  @IsDefined({ message: "city is Required" })
  city: string;

  @IsDefined({ message: "Sub location is rquired" })
  subLocation: string;

  @IsDefined({ message: "From Price is required" })
  fromPrice: number;

  @IsDefined({ message: "To Price is required" })
  toPrice: number;
}
