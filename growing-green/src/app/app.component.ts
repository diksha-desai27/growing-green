import { Component } from '@angular/core';
import { FooterComponent } from './shared/footer/footer.component';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';
import {NotificationService} from './Services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent {

  title = 'growing-green';


  constructor(private router: Router, public userService: UserService,private notifyService:NotificationService) { }

  openMyAccount() {
    var id = localStorage.getItem('_id');
    
    if (this.userService.isLoggedIn) {
      this.router.navigate(['/my-account/' + id]);
    }

  }

  showToast(){
    this.notifyService.showSuccess("hi","kalesai04@gmail.com");
  }

}
