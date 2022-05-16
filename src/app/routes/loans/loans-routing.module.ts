import { McsTransactionsComponent } from './mcs-transactions/mcs-transactions.component';
import { McsScheduleComponent } from './mcs-schedule/mcs-schedule.component';
import { McsDetailsComponent } from './mcs-details/mcs-details.component';
import { LoanOverviewComponent } from './loan-overview/loan-overview.component';
import { LoanMcaTelrComponent } from './loan-mca-telr/loan-mca-telr.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoansComponent } from './loans/loans.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: LoansComponent },

  {
    path: ':id',
    component: LoanDetailsComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: LoanOverviewComponent },
      {
        path: 'mca-telr',
        component: LoanMcaTelrComponent,
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'details', component: McsDetailsComponent },
          { path: 'schedule', component: McsScheduleComponent },
          { path: 'transactions', component: McsTransactionsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule {}
