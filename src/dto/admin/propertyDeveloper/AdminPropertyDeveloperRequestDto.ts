import { IsDefined } from "class-validator";

export class AdminPropertyDeveloperRequestDto {
  @IsDefined({ message: "Name is required" })
  name: string;

  @IsDefined({ message: "Total Project is required" })
  totalProjects: string;

  @IsDefined({ message: "experience is required" })
  experience: string;

  @IsDefined({ message: "Content is Required" })
  content: string;
}
