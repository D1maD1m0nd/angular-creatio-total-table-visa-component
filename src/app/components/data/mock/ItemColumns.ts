import {ICostItem} from "../model/ItemCost";
import {ICostColumn} from "../model/CostColumn";

export const CostItemsColumns : ICostColumn[] = [
  {
    Name: "Ответственный",
    ItemCostKey: "OwnerName"
  },
  {
    Name: "Статья затрат",
    ItemCostKey: "CostItemName"
  },
  {
    Name: "Группа статей затрат",
    ItemCostKey: "GroupCostItemName"
  },
  {
    Name: "Филилиал",
    ItemCostKey: "FilialName"
  },
  {
    Name: "Бренд",
    ItemCostKey: "BrandName"
  },
  {
    Name:  "1 кв",
    ItemCostKey: "FirstQuarterPlanSum"
  },
  {
    Name:  "2 кв",
    ItemCostKey: "SecondQuarterPlanSum"
  },
  {
    Name:  "3 кв",
    ItemCostKey: "ThirdQuarterPlanSum"
  },
  {
    Name:  "4 кв",
    ItemCostKey: "FourthQuarterPlanSum"
  },
  {
   Name: "Итог",
    ItemCostKey: "TotalSumPlan"
  }
]
