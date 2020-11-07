import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from 'app/loading/loading.service';
import { MessageService } from 'app/messages/messages.service';

@Injectable({
    providedIn: `root`
})
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(private http: HttpClient, private loading: LoadingService, private messages: MessageService) {
        this.loadAllCourses();
    }

    private loadAllCourses() {
        const loadCouses$ = this.http.get<Course[]>(`api/courses`).pipe(
            map(response => response[`payload`]),
            catchError(err => {
                const message = "Could not load courses";
                this.messages.showErrors(message);
                return throwError(err)
            }),
            tap(courses => this.subject.next(courses))
        );

        this.loading.showLoaderUntilCompleted(loadCouses$).subscribe();
    }

    filterByCategory(courseCategory: string): Observable<Course[]> {
        return this.courses$.pipe(map(courses => courses.filter(course => course.category === courseCategory).sort(sortCoursesBySeqNo)))
    }
}
