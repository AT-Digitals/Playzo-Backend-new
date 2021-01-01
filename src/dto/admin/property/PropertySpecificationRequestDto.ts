import { IsDefined } from "class-validator";

export class PropertySpecificationRequestDto {

  @IsDefined({ message: "Specification name is required" })
  name: string

  @IsDefined({message: "Specification Id is required"})
  id: string

  @IsDefined({message: "Specification Value is required"})
  value: string
}
