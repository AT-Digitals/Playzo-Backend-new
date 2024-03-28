import { v4 as uuidv4 } from "uuid";

export default class RandomUtils {
  public static getInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  public static pickOne<T>(array: T[]): T {
    return array[RandomUtils.getInt(array.length)];
  }

  public static generateCode() {
    return uuidv4();
  }
}
