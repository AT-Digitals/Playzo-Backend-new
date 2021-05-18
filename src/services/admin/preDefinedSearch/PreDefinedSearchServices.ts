import {
  PreDefinedSearchChangeOrderRequestDto,
  PreDefinedeSearchRequestDto,
  UpdatePreDefinedSearchRequstDto,
} from "../../../dto/admin/preDefinedSearch/PreDefinedSearchRequestDto";

import { AdminError } from "../../../dto/error/AdminError";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { PreDefinedSearch } from "../../../models/preDefinedSearch/PreDefinedSearch";
import { PreDefinedSearchDto } from "../../../dto/admin/preDefinedSearch/PreDefinedSearchDto";
import { PreDefinedSearchModel } from "../../../models/preDefinedSearch/PreDefinedSearchModel";
import { Service } from "typedi";

@Service()
export class PreDefinedSearchService {
  public async addPreDefinedSearch(
    preDefinedSearchDto: PreDefinedeSearchRequestDto
  ) {
    const preDefinedSearches = await PreDefinedSearch.find();
    let newPreDefinedSearch = new PreDefinedSearch({
      ...preDefinedSearchDto,
      order: preDefinedSearches.length + 1,
    });

    newPreDefinedSearch = await newPreDefinedSearch.save();
    newPreDefinedSearch = await newPreDefinedSearch
      .populate("properties")
      .execPopulate();

    return new PreDefinedSearchDto(newPreDefinedSearch);
  }

  public updateImage = async (preDefinedId: string, image: string) => {
    let preDefinedSearch = await this.findPreDefinedSearchById(preDefinedId);

    preDefinedSearch.image = image;

    preDefinedSearch = await preDefinedSearch.save();

    return new PreDefinedSearchDto(preDefinedSearch);
  };

  public async changeOrder(
    preDefinedChangeOrderDto: PreDefinedSearchChangeOrderRequestDto
  ) {
    let preDefinedSearch = await this.findPreDefinedSearchById(
      preDefinedChangeOrderDto.id
    );
    const preDefinedSearches = await PreDefinedSearch.find()
      .populate("properties")
      .exec();

    let relPreDefinedSearch: PreDefinedSearchModel | undefined;

    if (preDefinedChangeOrderDto.moveUp) {
      if (preDefinedSearch.order !== 1) {
        relPreDefinedSearch = preDefinedSearches.find(
          (preDefined: PreDefinedSearchModel) =>
            preDefined.order === preDefinedSearch.order - 1
        );

        preDefinedSearch.order = preDefinedSearch.order - 1;
        if (relPreDefinedSearch) {
          relPreDefinedSearch.order = relPreDefinedSearch.order + 1;
        }
      }
    } else {
      if (preDefinedSearch.order !== preDefinedSearches.length) {
        relPreDefinedSearch = preDefinedSearches.find(
          (preDefined) => preDefined.order === preDefinedSearch.order + 1
        );

        preDefinedSearch.order = preDefinedSearch.order + 1;
        if (relPreDefinedSearch) {
          relPreDefinedSearch.order = relPreDefinedSearch.order - 1;
        }
      }
    }

    preDefinedSearch = await preDefinedSearch.save();
    if (relPreDefinedSearch) {
      relPreDefinedSearch = await relPreDefinedSearch.save();
    }

    return new PreDefinedSearchDto(preDefinedSearch);
  }

  public async findPreDefinedSearchById(preDefinedSearchId: string) {
    const preDefinedSearch = await PreDefinedSearch.findById(preDefinedSearchId)
      .populate("properties")
      .exec();

    if (!preDefinedSearch) {
      throw new AppErrorDto(AdminError.PREDEFINED_ID_DOES_NOT_EXIST);
    }
    return preDefinedSearch;
  }

  public async getPreDefinedSearch(preDefinedId: string) {
    const preDefinedSearch = await this.findPreDefinedSearchById(preDefinedId);

    return new PreDefinedSearchDto(preDefinedSearch);
  }

  public async getAllPreDefinedSearch() {
    const preDefinedSearches = await PreDefinedSearch.find()
      .populate("properties")
      .exec();
    const sortedPreDefinedSearches: PreDefinedSearchModel[] = [];

    preDefinedSearches.forEach((preDefinedSearch) => {
      sortedPreDefinedSearches[preDefinedSearch.order - 1] = preDefinedSearch;
    });

    return sortedPreDefinedSearches.map(
      (preDefinedSearch) => new PreDefinedSearchDto(preDefinedSearch)
    );
  }

  public async updatePreDefinedSearch(
    updatePreDefinedDto: UpdatePreDefinedSearchRequstDto
  ) {
    let preDefinedSearch = await this.findPreDefinedSearchById(
      updatePreDefinedDto.id
    );

    preDefinedSearch.name = updatePreDefinedDto.name;
    preDefinedSearch.properties = updatePreDefinedDto.properties;

    preDefinedSearch = await preDefinedSearch.save();
    preDefinedSearch = await preDefinedSearch
      .populate("properties")
      .execPopulate();

    return new PreDefinedSearchDto(preDefinedSearch);
  }
}
