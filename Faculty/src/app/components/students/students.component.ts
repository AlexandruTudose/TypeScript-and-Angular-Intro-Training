import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  students: Student[] = this.getSomeStudents();

  constructor() { 
    this.setCourses();
  }

  getSomeStudents(): Student[] {
    return [
      {id: '1', firstName: 'Alex', lastName: 'Tudose', birthDate: new Date(1996, 1, 1)} as Student,
      {id: '2', firstName: 'Andrei', lastName: 'Popa', birthDate: new Date(1996, 1, 1)} as Student,
      {id: '3', firstName: 'Ionut', lastName: 'Apostol', birthDate: new Date(1996, 1, 1), year: 2} as Student
    ] as Student[];
  }

  showCoursesFor(student: Student): void {
    student.isShowingCourses = !student.isShowingCourses;
  }

  setCourses(): void {
    this.students[0].courses = [
      {id: '1', title: 'Databases', year: 2, semester: 1, credits: 5} as Course,
      {id: '2', title: 'IP', year: 2, semester: 2, credits: 5} as Course,
      {id: '3', title: '.Net', year: 2, semester: 2, credits: 5} as Course
    ] as Course[];
  }

  deleteCourseById(student: Student, courseId: string): void {
    student.courses = student.courses.filter(c => c.id !== courseId);
  }
}
