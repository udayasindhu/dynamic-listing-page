import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class FcmPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items per page';
  override nextPageLabel     = 'Next page';
  override previousPageLabel = 'Previous page';
  
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `Page 1 of 1`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `Page ${page + 1} of ${Math.ceil(length / pageSize)}`;
  };
}
