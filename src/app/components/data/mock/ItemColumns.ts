
import {ICostColumn} from "../model/CostColumn";

export const CostItemsColumns : ICostColumn[] = [
  {
    Name: "Ответственный",
    ItemCostKey: "OwnerName",
    Checked: true,
    Visible: true
  },
  {
    Name: "Статья затрат",
    ItemCostKey: "CostItemName",
    Checked: true,
    Visible: true
  },
  {
    Name: "Группа статей затрат",
    ItemCostKey: "GroupCostItemName",
    Checked: true,
    Visible: true
  },
  {
    Name: "Филилиал",
    ItemCostKey: "FilialName",
    Checked: true,
    Visible: true
  },
  {
    Name: "Бренд",
    ItemCostKey: "BrandName",
    Checked: true,
    Visible: true
  },
  {
    Name:  "1 кв",
    ItemCostKey: "FirstQuarterPlanSum",
    Checked: true,
    Visible: true
  },
  {
    Name:  "2 кв",
    ItemCostKey: "SecondQuarterPlanSum",
    Checked: true,
    Visible: true
  },
  {
    Name:  "3 кв",
    ItemCostKey: "ThirdQuarterPlanSum",
    Checked: true,
    Visible: true
  },
  {
    Name:  "4 кв",
    ItemCostKey: "FourthQuarterPlanSum",
    Checked: true,
    Visible: true
  },
  {
   Name: "Итог",
    ItemCostKey: "TotalSumPlan",
    Checked: true,
    Visible: true
  }
]
