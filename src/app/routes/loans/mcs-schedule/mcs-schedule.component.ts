import { environment } from '@env/environment';
import { STColumn, STComponent, STPage } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mcs-schedule',
  templateUrl: './mcs-schedule.component.html'
})
export class McsScheduleComponent implements OnInit {
  id: string = '';
  data: any[] = [];
  loading = true;

  page: STPage = {
    front: false,
    show: false
  };

  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    { title: '#', index: 'no', fixed: 'left', width: 60 },
    { title: 'due', index: 'due', fixed: 'left', width: 100 },
    { title: 'principalExpected', index: 'principalExpected' },
    { title: 'interestExpected', index: 'interestExpected' },
    { title: 'feesExpected', index: 'feesExpected' },
    { title: 'penaltyExpected', index: 'penaltyExpected' },
    { title: 'taxesExpected', index: 'taxesExpected' },
    { title: 'totalExpected', index: 'totalExpected' },
    { title: 'principalPaid', index: 'principalPaid' },
    { title: 'pnterestPaid', index: 'pnterestPaid' },
    { title: 'feesPaid', index: 'feesPaid' },
    { title: 'penaltyPaid', index: 'penaltyPaid' },
    { title: 'taxesPaid', index: 'taxesPaid' },
    { title: 'totalPaid', index: 'totalPaid' },
    { title: 'paidDate', index: 'paidDate' },
    { title: 'principalDue', index: 'principalDue' },
    { title: 'interestDue', index: 'interestDue' },
    { title: 'feesDue', index: 'feesDue' },
    { title: 'penaltyDue', index: 'penaltyDue' },
    { title: 'taxesDue', index: 'taxesDue' },
    { title: 'totalDue', index: 'totalDue' },
    { title: 'state', index: 'state', fixed: 'right', width: 100 }
  ];

  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.parent?.parent?.params.subscribe(params => {
      this.id = params['id'] as string;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http.get(`${environment.api.baseUrl}/loans/${this.id}/schedule`).subscribe(res => {
      this.data = res.data.map((_: any, idx: number) => {
        return {
          no: idx + 1,
          ..._
        };
      });

      this.loading = false;
    });
  }
}
