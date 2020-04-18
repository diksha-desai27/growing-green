import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from '../../Services/user.service';
import { StringifyOptions } from 'querystring';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';
import { faSignInAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [UserService]
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  signinForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  modelRef: any;
  registerSubmitted: boolean = false;
  faFacebook;
  faGoogle;
  faSignInAlt;
  faSignOutAlt;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  signinSubmitted: boolean = false;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private authService: AuthService, public userService: UserService, private router: Router, private notifyService: NotificationService) { }


  ngOnInit() {
    this.faFacebook = faFacebook;
    this.faGoogle = faGoogle;
    this.faSignInAlt = faSignInAlt;
    this.faSignOutAlt = faSignOutAlt;
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   //this.loggedIn = (user != null);
    //   console.log(this.user);
    //   if(user)
    //   {
    //     this.modelRef.close();
    //     this.clearForm();
    //     this.userService.socialRegister(user);
    //   }
    // });

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  registerWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //this.loggedIn = (user != null);
      // this.modelRef.close();
      // this.clearForm();
      // localStorage.setItem('access_token', user.authToken);
      // localStorage.setItem('_id', user.id);
      // this.router.navigate(['/my-account' + user.id]);

      if(user)
      {
        this.modelRef.close();
        this.clearForm();
        this.userService.socialRegister(user);
      }
    });

  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user)
      {
        this.modelRef.close();
        this.clearForm();
        this.userService.socialLogin(user);
      }
    });
  }

  signIn
  signOut(): void {
    this.authService.signOut();
  }

  closeResult: string;

  open(content) {
    this.modelRef = this.modalService.open(content,{
      backdrop: 'static',
      keyboard: false
  });
    this.modelRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  loginUser(form: FormGroup) {
    this.signinSubmitted = true;
    if (this.signinForm.valid) {
      this.userService.signIn(this.signinForm.value);
      this.clearForm();
      this.modelRef.close();
    }
  }

  registerUser(form: FormGroup) {
  
    this.registerSubmitted = true;
    if (this.registerForm.valid) {
      this.userService.postUser(this.registerForm.value).subscribe(
        res => {
          this.notifyService.showSuccess("Account registration Successful", "Notification");
          this.clearForm();
          this.modelRef.close();
          // setTimeout(() => this.showSuccessMessage = false, 4000);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = "Email address already exists";
          } else {
            this.serverErrorMessages = "Error occurred during registration";
          }
          this.notifyService.showError(this.serverErrorMessages, "Notification");

        });
    }
  }

  logout() {
    this.userService.doLogout();
    this.clearForm();
    this.modelRef.close();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  get g() { return this.signinForm.controls; }


  openMyAccount() {
    var id = localStorage.getItem('_id');

    if (this.userService.isLoggedIn) {
      this.router.navigate(['/my-account/' + id]);
    }
  }

  clearForm() {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}
