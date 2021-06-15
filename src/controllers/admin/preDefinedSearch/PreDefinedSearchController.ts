import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import {
  PreDefinedSearchChangeOrderRequestDto,
  PreDefinedeSearchRequestDto,
  UpdatePreDefinedSearchRequstDto,
} from "../../../dto/admin/preDefinedSearch/PreDefinedSearchRequestDto";
import {
  UploadUtils,
  UploadedFile,
  UploadedImage,
} from "../../../utils/UploadUtil";
import { AppError } from "../../../dto/error/AppError";
import { AppErrorDto } from "../../../dto/error/AppErrorDto";
import { IsAdmin } from "../../../middleware/AuthValidator";
import { PreDefinedSearchService } from "../../../services/admin/preDefinedSearch/PreDefinedSearchServices";
import { Service } from "typedi";

@JsonController("/admins/predefinedsearch")
@Service()
export class UsersController {
  constructor(private preDefinedSearchServices: PreDefinedSearchService) {}

  @Post("/")
  @IsAdmin()
  public async addPreDefinedSearch(
    @Body() preDefinedSearchDto: PreDefinedeSearchRequestDto
  ) {
    return this.preDefinedSearchServices.addPreDefinedSearch(
      preDefinedSearchDto
    );
  }

  @Put("/changeOrder")
  @IsAdmin()
  public async changeOrder(
    @Body() preDefinedSearchOrderDto: PreDefinedSearchChangeOrderRequestDto
  ) {
    return this.preDefinedSearchServices.changeOrder(preDefinedSearchOrderDto);
  }

  @IsAdmin()
  @Put("/:preDefinedId/image")
  public async updateImage(
    @UploadedImage("medias") imageFile: UploadedFile,
    @Param("preDefinedId") preDefinedId: string
  ) {
    const image = UploadUtils.getUploadedUrl(imageFile);

    if (image) {
      return this.preDefinedSearchServices.updateImage(preDefinedId, image);
    } else {
      throw new AppErrorDto(AppError.INPUT_PARAM_ERROR);
    }
  }

  @IsAdmin()
  @Get("/:preDefinedId")
  public async getPropertyDetails(@Param("preDefinedId") preDefinedId: string) {
    return this.preDefinedSearchServices.getPreDefinedSearch(preDefinedId);
  }

  @Get("/")
  @IsAdmin()
  public async getAllPreDefinedSearches() {
    return this.preDefinedSearchServices.getAllPreDefinedSearch();
  }

  @Put("/")
  @IsAdmin()
  public async updatePreDefinedSearch(
    @Body() updatePreDefinedSearchDto: UpdatePreDefinedSearchRequstDto
  ) {
    return this.preDefinedSearchServices.updatePreDefinedSearch(
      updatePreDefinedSearchDto
    );
  }
}
