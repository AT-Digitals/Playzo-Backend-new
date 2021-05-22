import { IsDefined } from "class-validator";

export class HomePageCarouselOrderUpdateRequestDto {
  @IsDefined({ message: "id is required" })
  id: string;

  @IsDefined({ message: "move flag is required" })
  moveUp: boolean;
}
