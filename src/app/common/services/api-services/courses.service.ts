import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Course} from '../../models/course.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends ApiService{

  constructor(public http: HttpClient) {
    super(http);
  }
  getAllCourses(): Observable<Course[]> {
    return  this.get<Course[]>('/courses');
  }
  getUserCourses(userId): Observable<Course[]> {
    return  this.get<Course[]>(`/courses/user/${userId}`);
  }
  createCourse(course: Course): Observable<Course> {
    return this.post<Course>('/courses' , course);
  }
  updateCourse(course: Course , courseId): Observable<Course> {
    return this.put<Course>(`/courses/${courseId}` , course);
  }
  deleteCourse(courseId): Observable<void> {
    return this.delete<void>(`/courses/${courseId}`);
  }
  enrollInCourse(userId: number , courseId: number): Observable<void> {
    return this.put<void>(`/courses/${userId}/${courseId}`);
  }
  exitFromCourse(userId: number , courseId: number): Observable<void> {
    return this.delete<void>(`/courses/${userId}/${courseId}`);
  }
}
