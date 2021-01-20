import { PropertySpecificationValueType } from "../../models/property/PropertySpecificationModal";

export class PropertySpecifictionDto {
  name: string;
  value: string;
  id: string;

  constructor(specification: PropertySpecificationValueType) {
    this.name = specification.name;
    this.value = specification.value;
    this.id = specification.id;
  }
}
