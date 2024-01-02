const StringBuildOrder: { [key: string]: string[]; } = {
    'address': ['street', 'city', 'state', 'country', 'zipCode', 'landmark']
};

export class StringBuilder {

    public static buildStringFromValues(dataObject: any, excludedValues: Array<string>, objectType: string): string {
        const keyOrder = StringBuildOrder[objectType];
        let stringValue = keyOrder.filter(key => !excludedValues.includes(key) && dataObject[key]).map(key => dataObject[key]).join();
        return stringValue;
    }
}