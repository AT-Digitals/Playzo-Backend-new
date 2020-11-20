export class EnvUtils {
  static isProd() {
    return process.env.ENV === "PROD";
  }
}
