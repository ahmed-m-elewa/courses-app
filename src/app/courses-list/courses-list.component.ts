import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Course} from '../common/models/course.model';
import {CoursesService} from '../common/services/api-services/courses.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {Observable} from 'rxjs';
import {User} from '../common/models/user.model';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

    @ViewChild('coursesModal') templateRef: TemplateRef<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    displayedColumns: string[] = ['title', 'instructorName', 'period', 'price', 'view', 'actions'];
    dataSource: MatTableDataSource<Course>;
    pageSize = 6;
    coursesList: Course[] = [];
    selectedCourse: Course;
    coursesForm: FormGroup;
    tblLoading;
    modalAction: string;
    selectedCourseIndex: number;
    btnLoading: boolean;

    constructor(
        private modalService: NgbModal,
        private breakpointObserver: BreakpointObserver,
        private coursesService: CoursesService,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.coursesForm = fb.group({
            title: ['', [
                Validators.required
            ]],
            instructorName: ['', [
                Validators.required
            ]],
            description: ['', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(250)
            ]],
            period: [undefined, [
                Validators.required,
                Validators.min(0)
            ]],
            price: [undefined, [
                Validators.required,
                Validators.min(0)
            ]]
        });
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

    openModal(content) {
        this.modalService.open(content, {centered: true, backdropClass: 'light-blue-backdrop', size: 'lg'});
    }

    showCourse(element: Course, content) {
        this.selectedCourse = element;
        this.openModal(content);
    }

    openCourseModal(content, element?: any, index?) {
        this.coursesForm.reset();
        if (element) {
            this.selectedCourseIndex = index;
            this.selectedCourse = element;
            for (const control in this.coursesForm.controls) {
                this.coursesForm.controls[control].setValue(element[control]);
            }
            this.modalAction = 'EDIT';
        } else {
            this.modalAction = 'ADD';
        }
        this.openModal(content);
    }

    deleteCourse(id: any, index) {
        this.tblLoading = true;
        this.coursesService.deleteCourse(id).subscribe(
            () => {
                this.coursesList.splice(index, 1);
                this.dataSource.data = this.coursesList;
                this.tblLoading = false;
            }, err => {
                this.tblLoading = false;
                this._snackBar.open(
                    err.error.message, null, {
                        duration: 3000,
                        panelClass: ['error-snackbar'],
                        verticalPosition: 'top',
                        horizontalPosition: 'right'
                    });

            }
        );
    }

    saveCourse() {
        for (const control in this.coursesForm.controls) {
            this.coursesForm.controls[control].markAsDirty();
            this.coursesForm.controls[control].updateValueAndValidity();
        }
        if (this.coursesForm.valid) {
            this.btnLoading = true;
            const result: Observable<Course> = this.modalAction === 'ADD' ?
                this.coursesService.createCourse(this.coursesForm.value)
                : this.coursesService.updateCourse(this.coursesForm.value, this.selectedCourse.id);

            result.subscribe(res => {
                if (this.modalAction === 'ADD') {
                    this.coursesList.push(res);
                } else {
                    this.coursesList[this.selectedCourseIndex] = res;
                }
                this.dataSource.data = this.coursesList;
                this.btnLoading = false;
                this.modalService.dismissAll();
            }, err => {
                this.btnLoading = false;
                this.modalService.dismissAll();
                this._snackBar.open(
                    err.error.message, null, {
                        duration: 3000,
                        panelClass: ['error-snackbar'],
                        verticalPosition: 'top',
                        horizontalPosition: 'right'
                    });

            });
        }
    }

    enrollInCourse(courseId: number, index: number) {
        this.coursesList[index]['loading'] = true;
        const user = JSON.parse(localStorage.getItem('user')) as User;
        this.coursesService.enrollInCourse(user.id, courseId).subscribe(
            res => {
                this.coursesList[index]['enrolling'] = false;
                this.coursesList[index].enrolled = true;
                this.dataSource.data[index].enrolled = true;
            }, err => {
                this.coursesList[index]['enrolling'] = false;
                this._snackBar.open(
                    err.error.message, null, {
                        duration: 3000,
                        panelClass: ['error-snackbar'],
                        verticalPosition: 'top',
                        horizontalPosition: 'right'
                    });
            }
        );
    }

    exitFromCourse(courseId: number, index: number) {
        this.coursesList[index]['exiting'] = true;
        const user = JSON.parse(localStorage.getItem('user')) as User;
        this.coursesService.exitFromCourse(user.id, courseId).subscribe(
            res => {
                this.coursesList[index]['exiting'] = false;
                this.coursesList[index].enrolled = false;
                this.dataSource.data[index].enrolled = false;
            }, err => {
                this.coursesList[index]['exiting'] = false;
                this._snackBar.open(
                    err.error.message, null, {
                        duration: 3000,
                        panelClass: ['error-snackbar'],
                        verticalPosition: 'top',
                        horizontalPosition: 'right'
                    });
            }
        );

    }


    // getters for coursesForm controls
    get title() {
        return this.coursesForm.controls['title'];
    }

    get instructorName() {
        return this.coursesForm.controls['instructorName'];
    }

    get description() {
        return this.coursesForm.controls['description'];
    }

    get period() {
        return this.coursesForm.controls['period'];
    }

    get price() {
        return this.coursesForm.controls['price'];
    }
}
