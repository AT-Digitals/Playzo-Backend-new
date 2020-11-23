import { AdminRequestDto } from "../dto/admin/AdminRequestDto";
import { AdminUser } from "../models/admin/AdminUser";

export class DatabaseSeeder {
  public static async init() {
    DatabaseSeeder.seedAdminTable();
  }

  public static async seedAdminTable() {
    const adminCount = await AdminUser.countDocuments({});
    if (adminCount === 0) {
      const email = process.env.DEFAULT_ADMIN_EMAIL;
      const phoneNumber = process.env.DEFAULT_ADMIN_PHONE;
      const name = "Admin";
      const password = process.env.DEFAULT_ADMIN_PASSWORD;
      if (!(email && phoneNumber && password)) {
        console.error("Please provide default admin credentials in env");
        return;
      }
      const defaultAdmin: AdminRequestDto = {
        email,
        phoneNumber,
        name,
        password,
      };
      const admin = new AdminUser(defaultAdmin);
      await admin.save();
      console.log("Created default admin user");
    }
    return;
  }
}
