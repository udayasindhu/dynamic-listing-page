import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  getJobsData(): Observable<any> {
    return this.http.get<any>('../../assets/json/jobs.json');
  }

  getMetaData(): Observable<any> {
    return this.http.get<any>('../../assets/json/jobs_meta.json');
  }
}
