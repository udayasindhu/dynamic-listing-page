import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';
import { Icons } from 'src/app/constants/Icons';

@Component({
  selector: 'customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
  headers: Array<string> = new Array<string>();
  hiddenHeaders: Array<string> = new Array<string>();
  closeIcon: string = Icons.CLOSE;
  allSelected: boolean = false;
  isAnySelected: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FilterComponent>) { }

  ngOnInit(): void {
    this.headers = [...this.data?.headers];
    this.hiddenHeaders = [...this.data?.hiddenHeaders];
    this.allSelected = this.hiddenHeaders.length === 0;
    this.isAnySelected = this.hiddenHeaders.length > 0 && this.hiddenHeaders.length !== this.headers.length;
  }

  masterToggle(selected: boolean) {
    this.allSelected = selected;
    this.hiddenHeaders = selected ? [] : [...this.headers];
  }

  isSelected(header: string) {
    return !this.hiddenHeaders.includes(header);
  }

  performAction(header: string) {
    if (!this.hiddenHeaders.includes(header)) {
      this.hiddenHeaders.push(header);
      this.allSelected = false;
    } else {
      const index = this.hiddenHeaders.indexOf(header);
      this.hiddenHeaders.splice(index, 1);
      this.allSelected = this.hiddenHeaders.length === 0;
    }

    if (!this.allSelected && this.hiddenHeaders.length > 0) {
      this.isAnySelected = true;
    } else {
      this.isAnySelected = false;
    }
  }

  applyCustomization() {
    this.dialogRef.close({ hiddenHeaders: this.hiddenHeaders });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
