import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Icons } from 'src/app/constants/Icons';
import { Filter } from 'src/app/models/Filter';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterBy: string = '';
  filterValue: string = '';
  filterOptions: Filter[] = [];
  filterValues: string[] = [];
  dataSource: Array<any> = [];
  closeIcon: string = Icons.CLOSE;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FilterComponent>) { }

  ngOnInit(): void {
    this.filterOptions = this.data?.filterOptions;
    this.dataSource = this.data?.dataSource;
  };

  onFilterByChange() {
    this.filterValues = [...new Set(this.dataSource.map(row => row[this.filterBy]))];
  }

  applyFilter() {
    this.dialogRef.close({ filterBy: this.filterBy, filterValue: this.filterValue });
  }

  resetFilter() {
    this.filterBy = "";
    this.filterValue = "";
  }

  closeModal() {
    this.dialogRef.close();
  }
}
