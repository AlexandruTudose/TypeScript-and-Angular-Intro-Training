import { EventEmitter, OnDestroy } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  newCourse = {title: 'Default title'} as Course;
  courseForm: FormGroup;
  subscriptions = new Array<Subscription>();

  constructor(private readonly facultyService: FacultyService) {
    if(this.courses.length === 0) {
      this.fetchCourses();
    }
    this.courseForm = this.getCourseFormGroup();
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

  addCourse(): void {
    const newCourse = this.courseForm.value as Course;
    this.subscriptions.push(
      this.facultyService.addCourse(newCourse).subscribe(() => {
        this.fetchCourses();
      })
    );
  }

  changeTitle(title: string): void {
    //this.newCourse.title = title;
    this.newCourse.credits = title.length;
  }

  addCourseWithTemplateForms(form: FormGroup): void {
    console.log(form);
  }

  private fetchCourses(): void {
    this.subscriptions.push(
      this.facultyService.getCourses().subscribe((courses:Course[]) => {
        this.courses = courses;
      })
    );
  }

  private getCourseFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      year: new FormControl(1, [Validators.required]),
      semester: new FormControl(1, [Validators.required]),
      credits: new FormControl(0, [Validators.required])
    });
  }
}
