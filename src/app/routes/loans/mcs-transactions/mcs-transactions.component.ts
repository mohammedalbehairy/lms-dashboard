import { environment } from '@env/environment';
import { STColumn, STComponent } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { transactions } from '_mock/_transaction';

@Component({
  selector: 'app-mcs-transactions',
  templateUrl: './mcs-transactions.component.html',
  styleUrls: ['./mcs-transactions.component.less']
})
export class McsTransactionsComponent implements OnInit {
  id: string = '';
  data: any[] = [];
  loading = false;

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

  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    { title: 'User', index: 'userName' },
    { title: 'ID', index: 'trnxId' },
    { title: 'Value Date', index: 'trnxDate' },
    { title: 'Type', index: 'type' },
    { title: 'Amount', index: 'amount', className: 'col-green' },
    { title: 'Principal Balance', index: 'principalBalance', className: 'col-green' },
    { title: 'Arrears Position', index: 'arrearsPosition', className: 'col-green' },
    { title: 'Total Balance', index: 'totalBalance', className: 'col-green' }
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
    this.http.get(`${environment.api.baseUrl}/loans/${this.id}/transactions`).subscribe(res => {
      this.data = res.data;
      this.loading = false;
    });
  }
}
