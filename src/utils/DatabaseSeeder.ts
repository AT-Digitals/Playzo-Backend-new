import { AdminRequestDto } from "../dto/user/AdminRequestDto";
import { AdminUser } from "../models/admin/AdminUser";
import { Amount } from "../models/amount/Amount";
import { AmountModel } from "../models/amount/AmountModel";
import { BookingType } from "../models/booking/BookingType";

export class DatabaseSeeder {
  public static async init() {
    DatabaseSeeder.seedAdminTable();
    DatabaseSeeder.seedAmountTable();
  }

  public static async seedAdminTable() {
    const adminCount = await AdminUser.countDocuments({});
    if (adminCount === 0) {
      const email = process.env.DEFAULT_ADMIN_EMAIL;
      const phone = parseInt(process.env.DEFAULT_ADMIN_PHONE??"");
      const name = "Admin";
      const password = process.env.DEFAULT_ADMIN_PASSWORD;

      if (!(email && phone && password)) {
        console.error("Please provide default admin credentials in env");
        return;
      }
      const defaultAdmin: AdminRequestDto = {
        email,
        name,
        phone,
        password,
      };
      console.log("defaultAdmin");
      const admin = new AdminUser(defaultAdmin);
      await admin.setPassword(defaultAdmin.password);
      await admin.save();
      console.log("Created default admin user");
    }
    return;
  }

  public static async seedAmountTable() {
   const amountCount = await Amount.countDocuments({});
   if(amountCount === 0){
    const defaultAmount: AmountModel[] = [
      {
        bookingAmount: 100,
        bookingtype: BookingType.Badminton,
        deleted: false
      } as AmountModel,
      {
        bookingAmount: 100,
        bookingtype: BookingType.BowlingMachine,
        deleted: false
      } as AmountModel,
      {
        bookingAmount: 100,
        bookingtype: BookingType.BoardGame,
        deleted: false
      } as AmountModel,
      {
        bookingAmount: 100,
        bookingtype: BookingType.CricketNet,
        deleted: false
      } as AmountModel,
      {
        bookingAmount: 100,
        bookingtype: BookingType.Playstaion,
        deleted: false
      } as AmountModel,
      {
        bookingAmount: 100,
        bookingtype: BookingType.Turf,
        deleted: false
      } as AmountModel,
    ]; 
    Amount.insertMany(defaultAmount)
    .then(() => {
      console.log("created default Amount Documents");
      
    })
    .catch(err => {
      console.log("error during Amount bulkInsert", err);
    });
    return;
   }
  }
}
