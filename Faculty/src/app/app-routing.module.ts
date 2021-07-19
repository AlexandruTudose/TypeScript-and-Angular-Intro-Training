import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./components/courses/courses.component";
import { StudentsComponent } from "./components/students/students.component";
import { CoursesGuard } from "./services/guards/courses-guard.service";
import { GradesGuard } from "./services/guards/grades-guard.service";

const routes: Routes = [
    {
        path: 'Courses',
        component: CoursesComponent,
        canActivate: [CoursesGuard]
    },
    {
        path: 'Students',
        component: StudentsComponent
    },
    {
        path: 'Grades',
        loadChildren: () => import('./modules/grades/grades.module').then(g => g.GradesModule),
        canLoad: [GradesGuard]
    },
    {
        path: "**",
        redirectTo: "Students"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        CoursesGuard,
        GradesGuard
    ]
})

export class AppRoutingModule { }