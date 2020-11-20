import bcrypt from "bcrypt";

export class PasswordHash {
  static saltRounds = 10;

  static encrypt(plainTextPassword: string) {
    return bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  static compare(passwordHash: string, plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, passwordHash);
  }
}
