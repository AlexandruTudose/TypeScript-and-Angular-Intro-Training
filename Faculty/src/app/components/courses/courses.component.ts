import { EventEmitter, OnDestroy } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { FacultyService } from 'src/app/services/guards/faculty.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [FacultyService]
})
export class CoursesComponent implements OnDestroy {
  @Input() courses: Course[] = [];
  @Output() onDeleteCourse = new EventEmitter<string>();

  subscriptions = new Array<Subscription>();

  constructor(private readonly facultyService: FacultyService) {
    if(this.courses.length === 0) {
      this.fetchCourses();
    }
   }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  deleteCourse(courseId: string): void {
    //this.onDeleteCourse.emit(courseId);
    var subscription = this.facultyService.deleteCourse(courseId).subscribe(() => {
      subscription.unsubscribe();
      this.fetchCourses();
    });
  }

  fetchCourses(): void {
    this.subscriptions.push(
      this.facultyService.getCourses().subscribe((courses:Course[]) => {
        this.courses = courses;
      })
    );
  }
}
