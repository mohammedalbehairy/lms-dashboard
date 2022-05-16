import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html'
})
export class LoanDetailsComponent implements OnInit {
  id: string;
  tabs = [
    {
      key: 'overview',
      tab: 'OverView'
    },
    {
      key: 'mca-telr',
      tab: 'MCA Telr + Acc Id'
    }
  ];
  selectedTab: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    let path = this.route.snapshot.firstChild?.routeConfig?.path;
    this.selectedTab = path == 'overview' ? 0 : 1;
  }

  ngOnInit(): void {}

  changeTab(item: { key: string }): void {
    this.router.navigateByUrl(`/loans/${this.id}/${item.key}`);
  }
}
