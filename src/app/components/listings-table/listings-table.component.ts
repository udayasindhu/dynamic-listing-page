
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DisplayType, getDisplayType } from 'src/app/utils/DisplayTypeResolver';
import { Icons } from 'src/app/constants/Icons';
import { FcmPaginator } from 'src/app/utils/FcmPagintor';
import { EMPTY_TABLE_DATA } from 'src/app/utils/ResponseResolver';
import { TableData } from 'src/app/models/TableData';
import { Filter } from 'src/app/models/Filter';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../shared/filter/filter.component';
import { CustomizeComponent } from '../shared/customize/customize.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'listings-table',
  templateUrl: './listings-table.component.html',
  styleUrls: ['./listings-table.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ListingsTableComponent implements OnInit {
  @Input() tableData: TableData = EMPTY_TABLE_DATA;

  filterOptions: Filter[] = [];
  filterApplied: boolean = false;

  hiddenHeaders: string[] = [];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageToGo: number = 1;

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(new FcmPaginator(), this.changeDetectorRef);

  initialColumnIndex: number = 0;
  draggedColumnIndex: number = 0;

  filterIcon: string = Icons.FILTER;
  customizeIcon: string = Icons.SETTINGS;
  exportIcon: string = Icons.EXPORT;
  closeIcon: string = Icons.CLOSE;
  searchIcon: string = Icons.SEARCH;

  filterBy: string = '';
  filterValue: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef, private matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('tableData' in changes) {
      this.tableData = { ...changes['tableData'].currentValue };
      // column details updated here
      this.displayedColumns = Object.keys(this.tableData.headerData);
      // datasource and paginator updated based on table data
      const rowData = { ...this.tableData.rowsData };
      this.dataSource.data = [...rowData.data];
      this.paginator.pageIndex = rowData.currentPage >= 1 ? (rowData.currentPage - 1) : 0;
      this.paginator.length = rowData.totalRecords;
      // Filter option values updated here
      if (this.tableData.filterOptions.length > 0) {
        this.filterOptions = [...this.tableData.filterOptions];
        // this.filterBy = this.filterOptions.length ? this.filterOptions[0].value : '';
      }
    }
  }

  getColumnsToDisplay(): string[] {
    if (this.displayedColumns.length > 0) {
      return ['select', ...this.displayedColumns];
    }
    return [];
  }

  getColumnValue(dataKey: string) {
    return this.tableData.headerData[dataKey].displayName;
  }

  isSortEnabled(dataKey: string): boolean {
    return !JSON.parse(this.tableData.headerData[dataKey].isSortable as any);
  }

  getElementType(column: any): { displayType: string, templateType: any; } {
    const contentType: string = this.tableData.headerData[column].displayType || DisplayType.TITLE;
    const templateType = this.tableData.headerData[column].displayType ?? 'string';
    const displayType = getDisplayType(contentType as DisplayType);
    return { displayType, templateType };
  }

  getElementValue(element: any, column: any) {
    return element[column];
  }

  getAdditionalValues(element: any) {
    return element?.['additionalValues'];
  }

  masterCheckbox() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onDragStarted(index: number) {
    this.initialColumnIndex = index;
  }

  onDragReleased() {
    this.applyColumnOrder();
  }

  onColumnDropped(event: CdkDragDrop<string[]>) {
    this.draggedColumnIndex = event.currentIndex;
    this.applyColumnOrder();
  }

  applyColumnOrder() {
    const newDisplayedColumns = [...this.displayedColumns];
    moveItemInArray(newDisplayedColumns, this.initialColumnIndex, this.draggedColumnIndex);
    this.displayedColumns = newDisplayedColumns;
  }

  search(event: Event) {
    const searchValue = ((event.target as HTMLInputElement).value).toLowerCase();
    if (searchValue) {
      this.dataSource.data = this.tableData.rowsData.data.filter(obj => !!Object.values(obj).find((val) => {
        return !!(val as string).toString().toLowerCase().includes(searchValue);
      }));
    } else {
      this.dataSource.data = [...this.tableData.rowsData.data];
    }
  }

  showFilterModal() {
    const filterDialogRef = this.matDialog.open(FilterComponent, {
      width: '350px',
      data: {
        filterOptions: this.filterOptions,
        dataSource: this.tableData.rowsData.data
      }
    });
    filterDialogRef.disableClose = true;
    filterDialogRef.afterClosed().subscribe((result) => {
      if (result.filterBy && result.filterValue) {
        this.filterApplied = true;
        this.dataSource.data = [...this.tableData.rowsData.data].filter(obj => obj[result.filterBy] === result.filterValue);
      }
    });
  }

  clearFilter() {
    this.filterApplied = false;
    this.dataSource.data = [...this.tableData.rowsData.data];
  }

  showCustomizeModal() {
    const headers = Object.values(this.tableData.headerData).map(header => header.displayName);
    const customizeDialogRef = this.matDialog.open(CustomizeComponent, {
      width: '350px',
      data: {
        headers,
        hiddenHeaders: this.hiddenHeaders
      }
    });
    customizeDialogRef.disableClose = true;
    customizeDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.hiddenHeaders = result.hiddenHeaders;
        this.displayedColumns = Object.values(this.tableData.headerData).filter(header => !this.hiddenHeaders.includes(header.displayName)).map(header => header.dataKey);
      }
    });
  }

  exportData() {
    const pdfFile = new jsPDF();
    autoTable(pdfFile, { html: '#listings' });
    pdfFile.save('job_listings.pdf');
  }

  pageChanged(pageEvt: PageEvent) {
    if (pageEvt.pageIndex !== this.pageToGo) {
      this.pageToGo = pageEvt.pageIndex + 1;
    }
  }

  goToPage(): void {
    if (this.pageToGo > 0 && this.pageToGo <= this.paginator.getNumberOfPages()) {
      this.paginator.pageIndex = this.pageToGo - 1;
      this.paginator.page.next({
        pageIndex: this.pageToGo,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    } else {
      this.pageToGo = this.paginator.pageIndex + 1;
    }
  }

  getTypographyStyle(type: string): string {
    const typoType = <string>(type);
    let styleClass = "";
    if (typoType === "title") {
      styleClass = "w-40 mr-8";
    } else if (typoType === "customer") {
      styleClass = "w-64 mr-8";
    } else {
      styleClass = "ml-10 mr-10 text-center";
    }
    return styleClass;
  }
}