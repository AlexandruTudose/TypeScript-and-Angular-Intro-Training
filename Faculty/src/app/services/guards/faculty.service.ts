import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "src/app/models/course.model";

const baseRoute = 'https://facultyapi.azurewebsites.net/api/v1/'; 

@Injectable()
export class FacultyService {

    constructor(private httpClient: HttpClient){
    }

    addCourse(course: Course): Observable<void> {
        return this.httpClient.post(`${baseRoute}Courses`, course)
        .pipe(map(() => { }));
    }

    deleteCourse(courseId: string): Observable<void> {
        return this.httpClient.delete(`${baseRoute}Courses/${courseId}`)
        .pipe(map(() => { }));
    }

    getCourses(): Observable<Course[]> {
      return this.httpClient.get<Course[]>(`${baseRoute}Courses`)
      .pipe(map(corses => {
            corses.sort((c1: Course, c2: Course) => {
                return (c1.title ?? '').localeCompare(c2.title ?? '');
            });

          return corses;
      }));
    }
}