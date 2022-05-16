import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RepaymentModalComponent } from '../repayment-modal/repayment-modal.component';

@Component({
  selector: 'app-loan-mca-telr',
  templateUrl: './loan-mca-telr.component.html'
})
export class LoanMcaTelrComponent implements OnInit {
  id: string = '';
  selectedTab: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private modal: ModalHelper) {
    this.route.parent?.params.subscribe(params => {
      this.id = params['id'] as string;
    });

    let path = this.route.snapshot.firstChild?.routeConfig?.path;
    this.selectedTab = path == 'details' ? 0 : path == 'schedule' ? 1 : 2;

    console.log('------route----', this.route.snapshot.firstChild?.routeConfig?.path);
  }

  ngOnInit(): void {}

  changeTab(args: NzTabChangeEvent): void {
    this.router.navigateByUrl(`/loans/${this.id}/mca-telr/${(args.tab.nzTitle as string).toLowerCase()}`);
  }

  enterRepayment() {
    console.log('=======enterRepayment=======');
    this.modal.createStatic(RepaymentModalComponent, { i: { id: 0 } }).subscribe(() => {
      // this.st.load();
      // this.msg.info('回调，重新发起列表刷新');
    });
  }
}
