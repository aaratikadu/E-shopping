import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SessionService } from '../storage/session.service';
interface FeedbackListRequest {
  pageNumber: number;
  numberOfRecordPerPage: number;
}
interface FeedbackRequestType {
  feedback: string;
  userID?: number;
}
export interface FeedbackDetailsType {
  feedBack: string;
  feedbackID: number;
  userName: string;
}
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private api: ApiService,
    private session: SessionService
  ) { }

  getAll(payload: FeedbackListRequest) {
    return this.api.post('/api/Feedback/GetFeedbacks', payload);
  }
  add(payload: FeedbackRequestType) {
    payload.userID = this.session.getUsers()?.userId;
    return this.api.post('/api/Feedback/AddFeedback', payload);
  }

  delete(feedbackId: number) {
    return this.api.delete(`/api/Feedback/DeleteFeedback?ID=${feedbackId}`);
  }
}
