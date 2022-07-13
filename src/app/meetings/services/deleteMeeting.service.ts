import { Injectable } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
import { environment } from "src/environments/environment";
import { MeetingsAPIUrls } from "../Constants/meetings-apiUrls";

@Injectable({ providedIn: "root" })
export class deleteMeeting {
  constructor(private apiService: ApiService) {}
  deleteMeeting(reqObj) {
    let url = environment.apiUrl + MeetingsAPIUrls.deleteMeeting;
    return this.apiService.post(url, reqObj);
  }
}
