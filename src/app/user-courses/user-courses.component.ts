import { Component, OnInit } from '@angular/core';
import {Course} from '../common/models/course.model';
import {CoursesService} from '../common/services/api-services/courses.service';
import {MatTableDataSource} from '@angular/material';
import {User} from '../common/models/user.model';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {

  coursesList: Course[] = [];
  listLoading;

  constructor(
      private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.getUserCourses();
  }

  getUserCourses() {
    this.listLoading = true;
    const user = JSON.parse(localStorage.getItem('user')) as User;
    this.coursesService.getUserCourses(user.id).subscribe(
        res => {
          this.coursesList = res;
          this.listLoading = false;
        }, err => {
          console.error(err);
        }
    );
  }
}
