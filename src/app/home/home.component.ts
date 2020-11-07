import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesStore } from '../services/courses.stores';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private cousesStore: CoursesStore,) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    this.beginnerCourses$ = this.cousesStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.cousesStore.filterByCategory("ADVANCED");
  }

}




