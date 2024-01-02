export interface ColumnProperties {
    displayName: string;
    dataKey: string;
    dataType: string;
    isSortable: boolean;
    checked: boolean;
    combineColumn?: string;
    displayType?: string;
}

export interface MetaProperties {
    [key: string]: ColumnProperties;
}