import { IsDefined } from "class-validator";

export class AdminPropertyLocationRequestDto {
  @IsDefined({ message: "latitude is required" })
  latitude: number;

  @IsDefined({ message: "longitude is required" })
  longitude: number;
}
