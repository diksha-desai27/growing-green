import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../Services/events.service';
import { UserService } from '../../../Services/user.service';
import { IEvent } from '../../../model/event';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from '../../../Services/notification.service';
@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent implements OnInit {

  events = [];
  eventId: any;
  selectedEvent: any;
  getToken: boolean;
  constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute, private userService: UserService, private notifyService: NotificationService) {
    window.scrollTo(0,0);
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.eventId);
    if (localStorage.getItem('_id')) {
      this.getToken = true;
    } else {
      this.getToken = false;
    }
    console.log(this.getToken);

  }

  ngOnInit(): void {
    this.eventsService.getSelectedEvent(this.eventId)
      .subscribe((eventsData) => {
        console.log('eventsData', eventsData);
        this.selectedEvent = eventsData.data;
        //  this.filterData();

      });
  }

  registerEvent() {
    this.userService.registerEvents(this.selectedEvent).subscribe((res) => {
      console.log(res);
      if (res.status == "200") {
        this.notifyService.showSuccess("Event registration Successful", "Notification");
      }else{
        this.notifyService.showWraning("You've already registered for the event", "Notification");
      }

    });
  }

}
