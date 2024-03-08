import AuthDto from "../auth/AuthDto";
import { BookingDto } from "../booking/BookingDto";
import { UserModel } from "../../models/user/UserModel";
import { UserType } from "../auth/UserType";
import { elemT } from "../../utils/UnionArray";

export class UserDto extends AuthDto{
  email: string;
  name: string;
  id: string;
  phone?: number;
  interestedSports?:string[];
  token?:string;
  bookingHistory: BookingDto[] = [];

  constructor(user: UserModel) {
    super(user.id, UserType.USER);
    this.email = user.email;
    this.name = user.name;
    this.id = user.id;
    this.bookingHistory = elemT(user.bookingHistory).map(
      (booking) => new BookingDto(booking)
    );
    this.phone = user.phone;
    this.userType = UserType.USER;
    this.interestedSports = user.interestedSports;
  }
}
