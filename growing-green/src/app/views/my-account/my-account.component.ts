import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../model/user';
import { LoggerService } from 'src/app/Services/logger.service';
import {NotificationService} from '../../Services/notification.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers:[LoggerService]
})
export class MyAccountComponent implements OnInit {
  currentUser = {
    _id: "",
    fullName: "",
    email: "",
    password: "",
    events: []
  };
  events = [{
    eventId: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventStatus: "",
    eventRating: "",
    eventLocation: "",
    eventState: "",
    eventCountry: "",
    eventAttended: "",
    eventComments: ""
  }];
  stars: number[] = [1, 2, 3, 4, 5];
  faStar = faStar;
  showDonation: boolean = false;
  newDate: Date;
  formattedDate: String;
  upComingEvents = [];
  previousEvents = [];
  closeResult: string;
  selectedEvent: any = {};
  selectedRadio: any;
  selectedRating: number=0;
  comments: String = "";
  modalReference: any;


  constructor(private modalService: NgbModal, public userService: UserService, private activatedRoute: ActivatedRoute,private logger:LoggerService,private notifyService:NotificationService) {
    this.newDate = new Date();

    this.formattedDate = this.newDate.getFullYear().toString() + "/" + ((this.newDate.getMonth() + 1).toString().length == 2 ? (this.newDate.getMonth() + 1).toString() : "0" + (this.newDate.getMonth() + 1).toString()) + "/" + (this.newDate.getDate().toString().length == 2 ? this.newDate.getDate().toString() : "0" + this.newDate.getDate().toString());

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserProfile(id).subscribe(res => {
      this.populateEvents(res);
      this.logger.log(res);
    });

  }

  populateEvents(res) {
    this.currentUser = res.data;
    this.events = this.currentUser.events;
    for (let event of this.events) {
      if (this.isLater(this.formattedDate, event.eventDate)) {
        this.previousEvents.push(event);
      } else {
        this.upComingEvents.push(event);

      }
    }
  }
  openSection(section) {
    if (section == 'volunteer') {
      this.showDonation = false;
    } else {
      this.showDonation = true;

    }
  }


  isLater(date1, date2) {
    return date1 > date2;
  }


  openModal(content, data) {
    this.selectedEvent = data;
    this.modalReference = this.modalService.open(content,{
      backdrop: 'static',
      keyboard: false
  });
    this.modalReference.result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      console.log('result', result);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getSelectedRadioValue(value) {
    this.selectedRadio = value;
  }

  countStar(star) {
    this.selectedRating = star;
  }

  saveData() {
    if (this.selectedRadio == 'yes') {
      this.selectedEvent.eventAttended = "Attended";
      this.selectedEvent.eventRating = this.selectedRating;
    } else {
      this.selectedEvent.eventAttended = "Not Attended";
      this.selectedEvent.eventRating = "N/A";
    }
    this.selectedEvent.eventComments = this.comments;
    this.userService.updateFeedback(this.selectedEvent).subscribe((eventsData) => {
      if (eventsData.status == 200) {
        this.previousEvents=[];
        this.populateEvents(eventsData);
        this.modalReference.close();
        this.notifyService.showSuccess("Feedback updated successfully", "Notification");
      }else{
        this.notifyService.showError("Error in updating details", "Notification");

      } 
    });
  }

  cancelRegistration(event) {
    this.userService.cancelRegistration(event._id).subscribe((eventsData) => {
      if (eventsData.status == 200) {
        this.populateEvents(eventsData);
        this.notifyService.showSuccess("Event cancelled succesfully", "Notification");
      } else {
        this.notifyService.showError("Error in cancelling event", "Notification");
      }
    });

  }




}
