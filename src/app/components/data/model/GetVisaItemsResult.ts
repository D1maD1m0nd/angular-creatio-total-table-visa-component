import {ICostColumn} from "./CostColumn";
import {ICostItem} from "./ItemCost";

export interface IGetVisaItemsResult {
    CostItemColumn:  ICostColumn[];
    CostItemsResult: ICostItem[];
    Error?: string;
}
