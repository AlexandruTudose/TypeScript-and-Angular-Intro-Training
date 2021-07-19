import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses: Course[] = [];
  @Output() onDeleteCourse = new EventEmitter<string>();

  constructor() { }

  deleteCourse(courseId: string): void {
    this.onDeleteCourse.emit(courseId);
  }
}
