import { RepaymentModalComponent } from './repayment-modal/repayment-modal.component';
import { McsTransactionsComponent } from './mcs-transactions/mcs-transactions.component';
import { McsScheduleComponent } from './mcs-schedule/mcs-schedule.component';
import { McsDetailsComponent } from './mcs-details/mcs-details.component';
import { LoanMcaTelrComponent } from './loan-mca-telr/loan-mca-telr.component';
import { LoanOverviewComponent } from './loan-overview/loan-overview.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CurrencyPipeModule } from '@delon/util/pipes/currency';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { TagSelectModule } from '@delon/abc/tag-select';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans/loans.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';

const COMPONENTS = [
  LoansComponent,
  LoanDetailsComponent,
  LoanOverviewComponent,
  LoanMcaTelrComponent,
  McsDetailsComponent,
  McsScheduleComponent,
  McsTransactionsComponent,
  RepaymentModalComponent
];

@NgModule({
  imports: [
    SharedModule,
    LoansRoutingModule,
    EllipsisModule,
    TagSelectModule,
    AvatarListModule,
    FooterToolbarModule,
    NzPaginationModule,
    NzStepsModule,
    CurrencyPipeModule
  ],
  declarations: COMPONENTS
})
export class LoansModule {}
