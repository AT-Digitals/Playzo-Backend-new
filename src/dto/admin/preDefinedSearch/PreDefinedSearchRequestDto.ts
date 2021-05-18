import { IsDefined, Validate } from "class-validator";

import { IsValidProperty } from "../../../validators/PropertyValidator";

export class PreDefinedeSearchRequestDto {
  @IsDefined({ message: "Name is required" })
  name: string;

  @IsDefined({ message: "Property is required" })
  @Validate(IsValidProperty)
  properties: string[];
}

export class UpdatePreDefinedSearchRequstDto {
  @IsDefined({ message: "id is required" })
  id: string;

  @IsDefined({ message: "Name is required" })
  name: string;

  @IsDefined({ message: "Property is required" })
  @Validate(IsValidProperty)
  properties: string[];
}

export class PreDefinedSearchChangeOrderRequestDto {
  @IsDefined({ message: "id is required" })
  id: string;

  @IsDefined({ message: "moveUp flag is required" })
  moveUp: boolean;
}
