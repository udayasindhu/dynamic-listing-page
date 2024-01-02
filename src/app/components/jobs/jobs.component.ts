import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { JobsService } from 'src/app/services/jobs.service';
import { BreadCrumbs } from 'src/app/constants/BreadCrumbs';
import { RowProperties } from 'src/app/models/RowProperties';
import { EMPTY_TABLE_DATA, ResponseResolver } from 'src/app/utils/ResponseResolver';
import { TableData } from 'src/app/models/TableData';
import { Filter } from 'src/app/models/Filter';
import { JsonMapper } from 'src/app/utils/JsonMapper';

@Component({
  selector: 'jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  tableData: TableData = EMPTY_TABLE_DATA;
  filterOptions: Filter[] = [
    { displayName: 'Category', value: '' },
    { displayName: 'Status', value: '' },
    { displayName: 'Priority', value: '' }
  ];

  constructor(private jobService: JobsService, private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit(): void {
    this.breadcrumbsService.setBreadcrumbs([BreadCrumbs.JOBS]);
    this.buildTableData();
  }

  buildTableData() {
    this.jobService.getMetaData().subscribe(metaResponse => {
      const metaData = metaResponse.data;
      if (metaData) {
        this.jobService.getJobsData().subscribe(jobsResponse => {
          const totalRecords = JsonMapper.refactorOnlyKeys<RowProperties>(jobsResponse).totalRecords;
          this.breadcrumbsService.setBreadcrumbs([BreadCrumbs.JOBS, totalRecords.toString()]);
          this.tableData = ResponseResolver.buildTableData(metaData, jobsResponse, this.filterOptions);
        });
      } else {
        this.tableData = EMPTY_TABLE_DATA;
      }
    });
  }

};
