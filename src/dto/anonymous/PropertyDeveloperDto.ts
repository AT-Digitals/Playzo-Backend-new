import { PropertyDeveloperModel } from "../../models/propertyDeveloper/PropertyDeveloperModel";

export class PropertyDeveloperDto {
  id: string;
  name: string;
  totalProjects: string;
  experience: string;
  content: string;
  image: string;

  constructor(propertyDeveloper: PropertyDeveloperModel) {
    this.id = propertyDeveloper.id;
    this.name = propertyDeveloper.name;
    this.totalProjects = propertyDeveloper.totalProjects;
    this.experience = propertyDeveloper.experience;
    this.content = propertyDeveloper.content;
    this.image = propertyDeveloper.image;
  }
}
