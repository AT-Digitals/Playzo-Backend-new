export default class FilterUtils {
  public static getQueryString<T>(query: T | undefined) {
    if (!query) {
      return "";
    }
    const params = new URLSearchParams("");
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value as string);
      }
    });
    return "?" + params.toString();
  }

  public static getArrayQuery(name: string, value: string[]) {
    return "?" + value.map((v) => `${name}=` + v).join("&");
  }
}
