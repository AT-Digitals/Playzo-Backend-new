import { Types } from "mongoose";
import slugify from "slugify";

export type MatchedPart = {
  startIndex: number;
  text: string;
  matched: boolean;
};

export default class StringUtils {
  public static isSameId(
    source?: Types.ObjectId | string,
    target?: Types.ObjectId | string
  ) {
    return source?.toString() === target?.toString();
  }

  public static encodeAsUri(name: string) {
    return slugify(name, {
      remove: /[*+~,()'"!:@?]/g,
      lower: true,
    });
  }

  public static filenameShorten = (string: string, maxLength = 30) => {
    const fileData = string.split(".");
    const fileType = fileData[fileData.length - 1];
    return string.length > maxLength
      ? string.substring(0, 24) + `...(${fileType})`
      : string;
  };

  public static filterArrayBy<T>(
    array: T[],
    searchBy: (val: T) => string,
    value: string
  ): T[] {
    if (!value) {
      return array;
    }
    value = value.toLowerCase();
    return array.filter((val) => searchBy(val).toLowerCase().includes(value));
  }

  public static splitByTarget(text: string, target: string): MatchedPart[] {
    if (target === "") {
      return [{ startIndex: 0, text, matched: false }];
    }
    const matches = text.matchAll(new RegExp(target, "gi"));
    const parts: MatchedPart[] = [];
    let startIndex = 0;
    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }
      if (match.index !== startIndex) {
        parts.push(StringUtils.getPart(text, false, startIndex, match.index));
      }
      const endIndex = match.index + target.length;
      parts.push(StringUtils.getPart(text, true, match.index, endIndex));
      startIndex = endIndex;
    }
    parts.push(StringUtils.getPart(text, false, startIndex));
    return parts;
  }

  private static getPart(
    text: string,
    matched: boolean,
    startIndex: number,
    endIndex?: number
  ): MatchedPart {
    return {
      startIndex,
      text: text.substring(startIndex, endIndex),
      matched,
    };
  }
}
