import { AdminError } from "../../dto/error/AdminError";
import { AppErrorDto } from "../../dto/error/AppErrorDto";
import { PreDefinedSearch } from "../../models/preDefinedSearch/PreDefinedSearch";
import { PreDefinedSearchDto } from "../../dto/anonymous/PreDefinedSearchDto";
import { PreDefinedSearchModel } from "../../models/preDefinedSearch/PreDefinedSearchModel";
import { Service } from "typedi";

@Service()
export class PreDefinedSearchServices {
  public async getAllPreDefinedSearches() {
    const preDefinedSearches = await PreDefinedSearch.find()
      .populate("properties")
      .exec();

    const sortedPreDefinedSearch: PreDefinedSearchModel[] = [];

    preDefinedSearches.forEach((preDefined) => {
      sortedPreDefinedSearch[preDefined.order - 1] = preDefined;
    });

    return sortedPreDefinedSearch.map(
      (preDefined) => new PreDefinedSearchDto(preDefined)
    );
  }

  public async getPreDefinedSearch(preDefinedSearchId: string) {
    const preDefinedSearch = await this.findPreDefinedSearchById(
      preDefinedSearchId
    );
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
}
