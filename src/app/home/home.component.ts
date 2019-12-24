import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AuthenticationService} from '../auth/services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('branchModal') templateRef: TemplateRef<any>;
  userBranch;
  userBranchName;
  branchIsSelected = true;
  displayedColumns: string[] = ['discountCode', 'amount', 'csShare', 'date', 'view'];

  dataSource: MatTableDataSource<any>;
  pageSize = 6;
  branchesList = [];
  recentActivitiesList: any[] = [];
  loading;
  isLookupLoading;
  constructor(
    private modalService: BsModalService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
  }

/*  getBranchesLookup() {
    this.isLookupLoading = true;
    this.labsApi.getBranchesLookup(this.authService.userId).subscribe(
      (res: any) => {
        console.log('branches lookup : ', res);
        this.branchesList = res;
        this.isLookupLoading = false;
      }, err => {
        console.log(err);
        this.isLookupLoading = false;
      }
    );
  }

  getRecentActivities() {
    this.loading = true;
    this.labsApi.getLastActivities(localStorage.getItem('branch')).subscribe(
      res => {
        this.recentActivitiesList = res;
        this.dataSource = new MatTableDataSource<LabDirection>(this.recentActivitiesList);
        if (this.recentActivitiesList.length > this.pageSize) {
          this.dataSource.paginator = this.paginator;
        }
        this.loading = false;
      }, err => {
        console.error(err);
      }
    );
  }*/

 /* checkBranch() {
    if (!localStorage.getItem('branch')) {
      this.modalRef = this.modalService.show(this.templateRef, this.config);
      this.modalRef.setClass('branch-modal');
      this.branchIsSelected = false;
    } else {
      this.getRecentActivities();
    }
  }*/

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }
}
