import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repayment-modal',
  templateUrl: './repayment-modal.component.html',
  styleUrls: ['./repayment-modal.component.less']
})
export class RepaymentModalComponent implements OnInit {
  repaymentForm: FormGroup | undefined;

  i: any;
  cat: string[] = ['美食', '美食,粤菜', '美食,粤菜,湛江菜'];

  constructor(private modal: NzModalRef, public msgSrv: NzMessageService, public http: _HttpClient, private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.i.id > 0) {
      this.http.get('/pois').subscribe(res => (this.i = res.list[0]));
    }
  }

  initForm() {
    this.repaymentForm = this.fb.group({
      amount: this.fb.control(0),
      customRep: this.fb.control('true'),
      repItem: this.fb.control('Penalty'),
      repAmount: this.fb.control(0),
      valueDate: this.fb.control(null),
      bookingDate: this.fb.control(null),
      Recalculation: this.fb.control(null),
      RecalculationSlect: this.fb.control(null)
    });
  }

  save(): void {
    this.http.get('/pois').subscribe(() => {
      this.msgSrv.success('保存成功，只是模拟，实际未变更');
      this.modal.destroy(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  bookingDateChange(data: any) {}
  RecalculationSlectChange(data: any) {}
}
