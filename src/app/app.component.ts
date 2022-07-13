import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './shared/services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'meetings';
  isUserLoggedIn: boolean;
  isUserInMeetList = false;
  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
      this.sharedDataService.isUserLoggedIn.subscribe((res) => {
        this.isUserLoggedIn = res;
      });
  }

  ngDoCheck(){
    this.isUserInMeetList = this.sharedDataService.isUserInMeetList
  }

}
