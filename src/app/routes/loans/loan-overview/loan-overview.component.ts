import { STColumn, STComponent, STPage } from '@delon/abc/st';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-loan-overview',
  templateUrl: './loan-overview.component.html'
})
export class LoanOverviewComponent implements OnInit {
  id: string = '';
  data: any;

  accTableArr: any;

  page: STPage = {
    front: false,
    show: false
  };
  loading = false;

  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    { title: 'Account Name', index: 'accountName' },
    { title: 'Type', index: 'type' },
    { title: 'State', index: 'state' },
    { title: 'Balance', index: 'balance' }
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
    this.route.parent?.params.subscribe(params => {
      this.id = params['id'] as string;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http.get(`${environment.api.baseUrl}/loans/${this.id}/overview`).subscribe(res => {
      this.data = res.data;
      this.accTableArr = [
        {
          'Account Name': res.data['accountName'],
          type: res.data.type,
          state: res.data.state,
          balance: res.data.balance
        }
      ];
      this.loading = false;
    });
  }

  navigateToDetails(data: any) {
    this.router.navigate([`/loans/${data._id}/overview`]);
  }
}
