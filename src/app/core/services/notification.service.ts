import { Injectable } from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private nzNotificationService: NzNotificationService) { }

  dangerNotification(title: string,content: string) {
    this.nzNotificationService.create(
        'error',
        title,
        content
    )
  }

    successNotification(title: string, content: string) {
        this.nzNotificationService.create(
            'success',
            title,
            content
        )
    }
}
