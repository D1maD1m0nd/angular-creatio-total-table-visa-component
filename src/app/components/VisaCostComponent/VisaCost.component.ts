import {Component, Input, OnInit, Renderer2} from "@angular/core";
import {ICostItem} from "../data/model/ItemCost";
import {Sort} from '@angular/material/sort';
import {ICostColumn} from "../data/model/CostColumn";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FilteringColumnService} from "../../services/filteringcolumnservice.service";
import {ApiService} from "../../services/apiservice.service";
import {MatTableDataSource} from "@angular/material/table";
import {Group} from "../data/model/Group";

@Component({
        selector: 'app-visa-cost',
        templateUrl: './VisaCost.component.html',
        styleUrls: ['./VisaCost.component.css']
    }
)
export class VisaCostComponent implements OnInit {
    @Input() itemsColumnsArg: ICostColumn[]
    @Input() itemCostsArg: ICostItem[]
    sortingDisable: boolean = false
    itemsColumns: ICostColumn[]
    displayColumns: string[]
    groupByColumns: string[] = []
    itemCosts: ICostItem[]
    sortedDataItemCosts: ICostItem[]

    // @ts-ignore
    public dataSource = new MatTableDataSource<ICostItem | Group>([]);

    constructor(public filterColumnService: FilteringColumnService,
                private renderer: Renderer2,
                private apiService: ApiService) {

    }

    changeSortingEnabled() {

    }

    changeTotalSumPlan(value: number, item: ICostItem) {
        item.TotalSumPlan = value
        this.apiService.UpdateDetailBudgetSum(item.DetailBudgetId, value).subscribe(i => {
            console.log(i);
        });
    }

    sortData(sort: Sort) {
        const data = this.itemCosts.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedDataItemCosts = data;
            this.dataSource.data = this.sortedDataItemCosts
            return;
        }

        this.sortedDataItemCosts = data.sort((a: any, b: any) => {
            if (Object.keys(a).includes(sort.active)) {
                const isAsc = sort.direction === 'asc';
                return compare(a[sort.active], b[sort.active], isAsc);
            } else {
                return 0;
            }
        });
        this.dataSource.data = this.sortedDataItemCosts
    }

    tableDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.displayColumns, event.previousIndex, event.currentIndex);
    }

    ngOnInit(): void {
        this.itemCosts = this.itemCostsArg
        this.itemsColumns = this.itemsColumnsArg
        this.displayColumns = this.itemsColumns
            .filter((i) => i.Visible)
            .map((i) => i.ItemCostKey)
        this.sortedDataItemCosts = this.itemCostsArg.slice();
        this.dataSource.data = this.addGroups(this.sortedDataItemCosts, this.groupByColumns);
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
        this.dataSource.filter = performance.now().toString();
        this.filterColumnService.isVisible$.subscribe((i) => {
            console.log(i)
            let item = this.itemsColumns.find((column) => column.ItemCostKey == i?.ItemCostKey)
            if (item) {
                console.log(item)
                item.Visible = i?.Visible
                this.displayColumns = this
                    .itemsColumns
                    .filter(column => column.Visible)
                    .map(column => column.ItemCostKey)
            }
        })
    }

    groupBy(event: { stopPropagation: () => void; }, column: string) {
        event.stopPropagation();
        this.checkGroupByColumn(column, true);
        this.dataSource.data = this.addGroups(this.sortedDataItemCosts, this.groupByColumns);
        this.dataSource.filter = performance.now().toString();
    }

    checkGroupByColumn(field: string, add: boolean) {
        let found = null;
        for (const column of this.groupByColumns) {
            if (column === field) {
                found = this.groupByColumns.indexOf(column, 0);
            }
        }
        if (found != null && found >= 0) {
            if (!add) {
                this.groupByColumns.splice(found, 1);
            }
        } else {
            if (add) {
                this.groupByColumns.push(field);
            }
        }
    }

    // @ts-ignore
    unGroupBy(event, column) {
        event.stopPropagation();
        this.checkGroupByColumn(column, false);
        this.dataSource.data = this.addGroups(this.sortedDataItemCosts, this.groupByColumns);
        this.dataSource.filter = performance.now().toString();
    }

    // below is for grid row grouping
    customFilterPredicate(data: any | Group, filter: string): boolean {
        return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
    }

    getDataRowVisible(data: any): boolean {
        const groupRows = this.dataSource.data.filter(
            row => {
                if (!(row instanceof Group)) {
                    return false;
                }
                let match = true;
                this.groupByColumns.forEach(column => {
                    // @ts-ignore
                    if (!row[column] || !data[column] || row[column] !== data[column]) {
                        match = false;
                    }
                });
                return match;
            }
        );

        if (groupRows.length === 0) {
            return true;
        }
        const parent = groupRows[0] as Group;
        return parent.visible && parent.expanded;
    }

    groupHeaderClick(row: { expanded: boolean; }) {
        row.expanded = !row.expanded;
        this.dataSource.filter = performance.now().toString();  // bug here need to fix
    }

    addGroups(data: any[], groupByColumns: string[]): any[] {
        const rootGroup = new Group();
        rootGroup.expanded = true;
        return this.getSublevel(data, 0, groupByColumns, rootGroup);
    }

    getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
        if (level >= groupByColumns.length) {
            return data;
        }
        const groups = this.uniqueBy(
            data.map(
                row => {
                    const result = new Group();
                    result.level = level + 1;
                    result.parent = parent;
                    for (let i = 0; i <= level; i++) {
                        // @ts-ignore
                        result[groupByColumns[i]] = row[groupByColumns[i]];
                    }
                    return result;
                }
            ),
            JSON.stringify);

        const currentColumn = groupByColumns[level];
        let subGroups: any[] = [];
        groups.forEach((group: Group) => {
            // @ts-ignore
            const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
            group.totalCounts = rowsInGroup.length;
            const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
            subGroup.unshift(group);
            subGroups = subGroups.concat(subGroup);
        });
        return subGroups;
    }

    uniqueBy(a: any[], key: { (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string; (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string; (arg0: any): any; }) {
        const seen = {};
        return a.filter((item) => {
            const k = key(item);
            // @ts-ignore
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }

    isGroup(index: any, item: { level: boolean; }): boolean {
        return item.level;
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
