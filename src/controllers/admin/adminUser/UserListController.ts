import {  Get, JsonController, QueryParams } from "routing-controllers";
import { AdminUsersService } from "../../../services/admin/adminUser/AdminUsersService";
import { BookingDateFilterRequestDto } from "../../../dto/booking/BookingDateFilterRequestDto";
import { Service } from "typedi";
import { UserServices } from "../../../services/user/UserServices";

@JsonController("/admin/userList")
@Service()
export class UserListController {
  constructor(private adminUserService: AdminUsersService, private userServices: UserServices) {}

  @Get("/adminUsers")
  public async adminUserList(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.adminUserService.getAdminUserList(request);
  }

  @Get("/users")
  public async userList(@QueryParams() request: BookingDateFilterRequestDto) {
    return this.userServices.getUserList(request);
  }

}
