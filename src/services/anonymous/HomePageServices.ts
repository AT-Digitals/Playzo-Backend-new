import { CarouselDto } from "../../dto/anonymous/CarouelDto";
import { Category } from "../../models/category/Category";
import { HomePageCarousel } from "../../models/homePage/HomePageCarouselItem";
import { Property } from "../../models/property/Property";
import { PropertyDto } from "../../dto/anonymous/PropertyDto";
import { PropertyModel } from "../../models/property/PropertyModel";
import { Service } from "typedi";

@Service()
export class HomePageServices {
  public async getAllImages() {
    const homePageCarousels = await HomePageCarousel.find();

    return new CarouselDto(homePageCarousels);
  }

  public async getPropertiesOfCategory(categoryName: string) {
    const category = await Category.find({ name: categoryName });
    let properties: PropertyModel[] = [];
    if (category && category.length > 0) {
      properties = await Property.find({ categories: category[0].id }).populate(
        "categories"
      );
    } else {
      properties = await Property.find({}).populate([
        "categories",
        "propertyDeveloper",
      ]);
    }
    return properties.map((property) => new PropertyDto(property));
  }
}
