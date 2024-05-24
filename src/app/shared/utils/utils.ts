export class Utils {
  static getNullIfEmpty(value: any): any {
    if(value === ''){
      return null;
    }
    return value ? value : null;
  }
  static getNameOfEnumValue(enumType: any, enumValue: string): string | undefined {
    for (const key in enumType) {
      if (enumType[key] === enumValue) {
        return key;
      }
    }
    return undefined;
  }
}
