import {ICostColumn} from "./CostColumn";
import {ICostItem} from "./ItemCost";
import {IMetaData} from "./MetaData";

export interface IGetVisaItemsResult {
    CostItemColumn: ICostColumn[];
    CostItemsResult: ICostItem[];
    MetaData: IMetaData;
    Error?: string;
}
