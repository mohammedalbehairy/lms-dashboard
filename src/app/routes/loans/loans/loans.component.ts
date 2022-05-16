import { environment } from '@env/environment';
import { map, tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { STComponent, STColumn, STData, STChange, STColumnTag } from '@delon/abc/st';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { loans } from '_mock';
import { Router } from '@angular/router';

const TAG: STColumnTag = {
  1: { text: 'active', color: 'green' },
  2: { text: 'closed', color: 'red' }
};

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html'
})
export class LoansComponent implements OnInit {
  q: {
    pi: number;
    ps: number;
    no: string;
    sorter: string;
  } = {
    pi: 1,
    ps: 10,
    no: '',
    sorter: ''
  };
  data: any[] = [];
  loading = false;

  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    {
      title: 'Loan Name',
      index: 'loanName',
      type: 'link',
      click: d => {
        this.navigateToDetails(d);
      }
    },
    {
      title: 'accountId',
      index: 'accountId',
      type: 'link',
      click: d => {
        this.navigateToDetails(d);
      }
    },
    {
      title: 'holderName',
      index: 'accountHolderName',
      type: 'link',
      click: d => {
        this.navigateToDetails(d);
      }
    },
    // { title: 'accountState', index: 'accountState', type: 'tag', tag: TAG },
    { title: 'loanAmount', index: 'loanAmount' },
    { title: 'principleDue', index: 'principleDue' },
    { title: 'totalDue', index: 'totalDue' },
    { title: 'totalPaid', index: 'totalPaid' }
    // { title: 'lastModified', index: 'lastModified' }
  ];

  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.http.get(`${environment.api.baseUrl}/loans`).subscribe(res => {
      this.data = res.data;
      this.loading = false;
    });
  }

  navigateToDetails(data: any) {
    this.router.navigate([`/loans/${data.accountId}/overview`]);
  }
}
