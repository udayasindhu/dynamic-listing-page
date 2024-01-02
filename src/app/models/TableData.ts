import { Filter } from "./Filter";
import { MetaProperties } from "./MetaProperties";
import { RowProperties } from "./RowProperties";

export interface TableData {
    headerData: MetaProperties,
    rowsData: RowProperties,
    filterOptions: Filter[]
}