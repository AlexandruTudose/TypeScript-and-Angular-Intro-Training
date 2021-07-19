import { Course } from "./course.model";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    year: number;
    group: string;
    isShowingCourses: boolean;
    courses: Course[];
}