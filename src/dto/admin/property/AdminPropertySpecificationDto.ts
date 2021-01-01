import { PropertySpecificationModal } from "../../../models/property/PropertySpecificationModal";
import { PropertySpecifictionDto } from "./PropertySpecificationDto";

export class AdminPropertySpecificationDto {
    Flooring: PropertySpecifictionDto[] = [];
    Windows: PropertySpecifictionDto[] = [];
    Bathroom: PropertySpecifictionDto[] = [];
    Kitchen: PropertySpecifictionDto[] = [];
    Electrical: PropertySpecifictionDto[] = [];
    Fittings: PropertySpecifictionDto[] = [];
    Others: PropertySpecifictionDto[] = [];

    constructor(specifications: PropertySpecificationModal) {
        if (specifications) {
            this.Flooring = specifications.Flooring.map(ele => new PropertySpecifictionDto(ele));
            this.Windows = specifications.Windows.map(ele => new PropertySpecifictionDto(ele));
            this.Bathroom = specifications.Bathroom.map(ele => new PropertySpecifictionDto(ele));
            this.Electrical = specifications.Electrical.map(ele => new PropertySpecifictionDto(ele));
            this.Fittings = specifications.Fittings.map(ele => new PropertySpecifictionDto(ele));
            this.Kitchen = specifications.Kitchen.map(ele => new PropertySpecifictionDto(ele));
            this.Others = specifications.Others.map(ele => new PropertySpecifictionDto(ele));
        }
    }
}