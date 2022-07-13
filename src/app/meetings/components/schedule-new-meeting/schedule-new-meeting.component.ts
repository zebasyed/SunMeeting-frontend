import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup,Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedDataService } from "src/app/shared/services/shared-data.service";
import { CreateNewMeeting } from "../../services/createNewMeeting.service";

@Component({
  selector: "app-schedule-new-meeting",
  templateUrl: "./schedule-new-meeting.component.html",
  styleUrls: ["./schedule-new-meeting.component.scss"],
})
export class ScheduleNewMeetingComponent implements OnInit {
  scheduleNewMeetingForm: FormGroup;
  ErrorLine;
  submit = true;
  constructor(
    private sharedDataService: SharedDataService,
    private createNewMeeting: CreateNewMeeting,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedDataService.isUserInMeetList = false;
    this.scheduleNewMeetingForm = new FormGroup({
      meetingDate: new FormControl("",Validators.required),
      meetingTime: new FormControl("",Validators.required),
      meetingDesc: new FormControl("",Validators.required),
      meetingParticipant: new FormControl("",Validators.required),
    });
  }

  getAllParticipants(participants) {
    let participantArray = participants.split(",");
    return participantArray;
  }

  onSubmit(data) {
    if(this.scheduleNewMeetingForm.invalid){
      this.submit = false;
      this.ErrorLine = "Please complete the form above"
      return
    }
    let userData: any = this.sharedDataService.loggedInUserData;
    let obj = {
      organizer: userData.emailId,
      meetings: [
        {
          date: this.scheduleNewMeetingForm.value.meetingDate,
          time: this.scheduleNewMeetingForm.value.meetingTime,
          desc: this.scheduleNewMeetingForm.value.meetingDesc,
          participant: this.getAllParticipants(
            this.scheduleNewMeetingForm.value.meetingParticipant
          ),
        },
      ],
    };
    this.createNewMeeting.createNewMeeting(obj).subscribe((result) => {
      this.router.navigate(['/meetings/view']);
    })
  }
}
