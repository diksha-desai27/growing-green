import { Component, OnInit } from '@angular/core';
import { faBinoculars, faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from '../../../Services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  faBinoculars;
  faUserPlus;
  faPaperPlane;
  totalRecords = 0;
  page = 1;
  searchString: string = "";


  events = [];
  constructor(private eventsService: EventsService) {
    this.faBinoculars = faBinoculars;
    this.faUserPlus = faUserPlus;
    this.faPaperPlane = faPaperPlane;

  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.eventsService.getEvents()
      .subscribe((eventsData) => {
        console.log('eventsData', eventsData);
        this.events = eventsData.data;
        this.totalRecords = this.events.length;
      });

  }


}
