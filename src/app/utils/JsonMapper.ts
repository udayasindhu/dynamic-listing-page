import { StringMapper } from "./StringMapper";

export class JsonMapper {

    private static refactor<T>(jsonData: any, valueToo: boolean, mapper?: (key: string) => string): T {
        return Object.fromEntries(Object.entries(jsonData).map(([key, value]) => {
            const refactoredKey = mapper ? mapper(key) : StringMapper.underscoreToCamelCase(key);
            if (value !== null) {
                if (value instanceof Array) {
                    value = value.map(val => JsonMapper.refactor(val, valueToo));
                } else if (typeof value === 'object' && Object.keys(value).length !== 0) {
                    value = JsonMapper.refactor<Object>(value, valueToo);
                }
            }
            const newValue = valueToo ? mapper ? mapper(String(value)) : StringMapper.underscoreToCamelCase(String(value)) : value;
            return [refactoredKey, newValue];
        })) as unknown as T;
    }

    static refactorKeysAndValues<T>(jsonData: any): T {
        return JsonMapper.refactor(jsonData, true);
    }

    static refactorOnlyKeys<T>(jsonData: any): T {
        return JsonMapper.refactor(jsonData, false);
    }

    static refactorOnlyKeys_Dot<T>(jsonData: any): T {
        return JsonMapper.refactor(jsonData, false, StringMapper.dotToCamelCase);
    }

}