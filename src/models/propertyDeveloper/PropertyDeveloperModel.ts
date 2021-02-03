import { Document } from "mongoose";

export interface PropertyDeveloperModel extends Document {
  name: string;
  totalProjects: string;
  experience: string;
  content: string;
  image: string;
}
