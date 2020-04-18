import { Component, OnInit } from '@angular/core';
import { faEnvelope,faPhone,faMapMarker } from '@fortawesome/free-solid-svg-icons';
import {faTwitter,faFacebook,faInstagram,faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faEnvelope;
  faPhone;
  faMapMarker;
  faTwitter;
  faFacebook;
  faInstagram;
  faLinkedin;

  constructor() { 
    this.faEnvelope = faEnvelope;
    this.faPhone = faPhone;
    this.faMapMarker = faMapMarker;
    this.faTwitter =faTwitter;
    this.faFacebook = faFacebook;
    this.faInstagram = faInstagram;
    this.faLinkedin = faLinkedin;
  }

  ngOnInit(): void {
  }

}
