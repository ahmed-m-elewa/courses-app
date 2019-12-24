import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {BsModalService} from 'ngx-bootstrap';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AuthenticationService} from '../auth/services/authentication.service';
import * as moment from 'moment';
import {Course} from '../common/models/course.model';
import {CoursesService} from '../common/services/api-services/courses.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  @ViewChild('courseModal') templateRef: TemplateRef<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'instructorName', 'period', 'price', 'view'];
  dataSource: MatTableDataSource<Course>;
  pageSize = 6;
  coursesList: Course[] = [];
  selectedCourse: Course;
  tblLoading;

  constructor(
    private modalService: NgbModal,
    private breakpointObserver: BreakpointObserver,
    private coursesService: CoursesService
  ) {
  }

  ngOnInit() {
    this.getCoursesList();
  }

  getCoursesList() {
    this.tblLoading = true;
    this.coursesService.getAllCourses().subscribe(
      res => {
        this.coursesList = res;
        this.dataSource = new MatTableDataSource<Course>(this.coursesList);
        if (this.coursesList.length > this.pageSize) {
          this.dataSource.paginator = this.paginator;
        }
        this.tblLoading = false;
      }, err => {
        console.error(err);
      }
    );
  }

  /* checkBranch() {
     if (!localStorage.getItem('branch')) {
       this.modalRef = this.modalService.show(this.templateRef, this.config);
       this.modalRef.setClass('branch-modal');
       this.branchIsSelected = false;
     } else {
       this.getRecentActivities();
     }
   }*/

  openModal(content) {
    this.modalService.open(content, {centered: true, backdropClass: 'light-blue-backdrop', size: 'lg'});
  }

  showCourse(element: Course, content) {
    this.selectedCourse = element;
    this.openModal(content);
  }
}
