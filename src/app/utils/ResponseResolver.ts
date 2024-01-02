import { ApiResponse } from "../models/ApiResponse";
import { Filter } from "../models/Filter";
import { ColumnProperties, MetaProperties } from "../models/MetaProperties";
import { RowProperties } from "../models/RowProperties";
import { TableData } from "../models/TableData";
import { JsonMapper } from "./JsonMapper";
import { StringMapper } from "./StringMapper";

export const EMPTY_HEADER_PROPS: MetaProperties = {
};

export const EMPTY_ROW_PROPS = {
    data: [],
    totalRecords: 0,
    currentPage: 0,
};

export const EMPTY_API_RESPONSE = {
    ...EMPTY_ROW_PROPS,
    totalPages: 0
};

export const EMPTY_TABLE_DATA = {
    headerData: EMPTY_HEADER_PROPS,
    rowsData: EMPTY_ROW_PROPS,
    filterOptions: []
};

const additionalValueKeys: { [key: string]: string; } = {
    "customer": "customerAddress"
};

export class ResponseResolver {

    private static parseValue(key: string, jsonData: any) {
        //split the data key based on dot then iterate over the object until we get the specific key
        return key.split('.').reduce((obj: any, part: any) => obj && obj[part], jsonData);
    }

    private static parseRowsData(headerProps: Array<ColumnProperties>, data: Array<any>) {
        return data.map(jsonData => {
            let row = {
                additionalValues: {}
            };
            headerProps.forEach(header => {
                const dataKey = header.dataKey;
                let value;
                if (header?.['combineColumn']) {
                    const combineKeys = header?.['combineColumn'];
                    // if combine column value is present then we are spliting based on space and then 
                    // getting value from jobs response and join based on spaces 
                    value = combineKeys?.replace(/{{|}}/g, '').split(" ")
                        .map(val => ResponseResolver.parseValue(val, jsonData))
                        .filter(val => val)
                        .join(' ');
                } else {
                    value = ResponseResolver.parseValue(dataKey, jsonData);
                }
                if (header.displayType) {
                    const additionalValueKey = additionalValueKeys[header.displayType];
                    if (additionalValueKey) {
                        const additionalValue = ResponseResolver.parseValue(additionalValueKey, jsonData);
                        row.additionalValues = { ...row.additionalValues, [additionalValueKeys[header.displayType]]: additionalValue };
                    }
                }
                // adding the retrived data into rows data 
                row = { ...row, [dataKey]: value };
            });
            return row;
        });
    }

    private static refactorMetaData(metaData: Array<any>) {
        // retaining dot character to get the nested values from jobs data
        return metaData.map(jsonData => JsonMapper.refactorKeysAndValues<ColumnProperties>(jsonData));
    }

    public static buildTableData(metaData: Array<any>, dataSource: ApiResponse, compFilterOptions?: Filter[]): TableData {
        const headerProps: Array<ColumnProperties> = ResponseResolver.refactorMetaData(metaData);
        let formattedDataSource: RowProperties = { ...JsonMapper.refactorOnlyKeys<RowProperties>(dataSource) };
        if (formattedDataSource?.data) {
            const parsedRowData = ResponseResolver.parseRowsData(headerProps, formattedDataSource.data);
            const { headerData, filterOptions } = ResponseResolver.buildHeaderData(headerProps, compFilterOptions);
            const rowsData: Array<any> = ResponseResolver.refactorRowKeys(parsedRowData);
            return { headerData, rowsData: { ...dataSource, data: rowsData }, filterOptions };
        } else {
            return EMPTY_TABLE_DATA;
        }
    }

    private static buildHeaderData(headerProps: Array<ColumnProperties>, filterOptions?: Filter[]) {
        //replacing dot charactrer from the json meta values to build the header data for the table
        const headerData = Object.fromEntries(headerProps.map(header => {
            const dataKey = StringMapper.convertToCamelCase(header.dataKey);

            if (filterOptions) {
                // Setting formatted key to the filterOption value
                const filterOptionIndex: number = filterOptions.findIndex(option => option.displayName === header.displayName);
                if (filterOptionIndex >= 0) {
                    const filterOption = filterOptions[filterOptionIndex];
                    filterOptions[filterOptionIndex] = { ...filterOption, value: dataKey };
                }
            }

            return [[dataKey], { ...header, dataKey }];
        }));

        return { headerData, filterOptions: filterOptions ? filterOptions : [] };

    }

    private static refactorRowKeys(data: Array<any>) {
        //replacing dot character from the key since the dot removed from the header data
        return [...data].map(jsonData => JsonMapper.refactorOnlyKeys_Dot<any>(jsonData));
    }

}