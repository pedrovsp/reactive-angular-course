import {Component, OnInit} from '@angular/core';
import { MessageService } from './messages/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {


    }

  logout() {

  }

}
