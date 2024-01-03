import { BookingDto } from "../Booking/BookingDto";
import { UserModel } from "../../models/user/UserModel";
import { elemT } from "../../utils/UnionArray";

export class UserDto {
  email: string;
  name: string;
  id: string;
  bookingHistory: BookingDto[] = [];

  constructor(user: UserModel) {
    this.email = user.email;
    this.name = user.name;
    this.id = user.id;
    this.bookingHistory = elemT(user.bookingHistory).map(
      (booking) => new BookingDto(booking)
    );
  }
}
