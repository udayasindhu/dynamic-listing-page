export class StringMapper {

    static underscoreToCamelCase(key: string) {
        return key.replace(/[_]\w/g, match => match.charAt(1).toUpperCase());;
    }

    static dotToCamelCase(key: string) {
        return key.replace(/[.]\w/g, match => match.charAt(1).toUpperCase());;
    }

    static convertToCamelCase(key: string) {
        return key.replace(/([._]\w)/g, match => match.charAt(1).toUpperCase());;
    }

}