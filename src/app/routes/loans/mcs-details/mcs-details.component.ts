import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mcs-details',
  templateUrl: './mcs-details.component.html'
})
export class McsDetailsComponent implements OnInit {
  id: string = '';
  data: any;
  loading = false;

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
    this.http.get(`${environment.api.baseUrl}/loans/${this.id}/details`).subscribe(res => {
      this.data = res.data;
      this.loading = false;
    });
  }
}
