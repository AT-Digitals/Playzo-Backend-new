import { AdminRequestDto } from "../dto/user/AdminRequestDto";
import { AdminUser } from "../models/admin/AdminUser";

export class DatabaseSeeder {
  public static async init() {
    DatabaseSeeder.seedAdminTable();
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
}
