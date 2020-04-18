import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { DonateService } from '../../Services/donate.service';
import {Donate} from '../../Services/donate.model';
import { NotificationService } from '../../Services/notification.service';
import {Router} from '@angular/router';
declare let paypal: any;

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent implements OnInit {
  @ViewChild('paypal') paypalElement: ElementRef;
  public selectedAmount: number = 1;
  public paymentDetails: Donate = {
    order_id: '',
    payer_email: '',
    payer_id: '',
    name: '',
    amount: '',
    payment_status: '',
  };
  amounts = [25, 50, 100, 250, 500, 1000];
  constructor(
    public donateService: DonateService,
    public notificationService: NotificationService,
    public router:Router
    ) {
      window.scrollTo(0,0);
    }

  ngOnInit(): void {
    window.scrollTo(0,0);
    document.getElementById("paypal-button-container").style.display='none';
    this.loadPayPal(this);
  }

  public getDonationAmount(event: any) {
      this.selectedAmount = event.target.value;
      document.getElementById("paypal-button-container").style.display='block';
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  private loadPayPal(e) {
    paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'pay',
        },

        createOrder: function (data, actions) {

          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: e.selectedAmount,
                  //value: JSON.stringify(this.selectedAmount)
                },
              },
            ],

            application_context: { shipping_preference: 'NO_SHIPPING' },
          });
        },

        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            console.log(
              'Transaction completed by ' + details.payer.name.given_name
            );
            // console.log("Data: " + JSON.stringify(data));
            console.log('Details: ' + details);
            // console.log("Details.payer: " + JSON.stringify(details.payer));
            e.savePayment(details);
            // alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      })
      .render('#paypal-button-container');
  }

  public savePayment(details: any) {
    if (!details.purchase_units[0].amount.value) {
      details.purchase_units[0].amount.value = '1';
    }
    this.paymentDetails.order_id = details.id;
    this.paymentDetails.payer_email = details.payer.email_address;
    this.paymentDetails.payer_id = details.payer.payer_id;
    this.paymentDetails.name = details.payer.name;
    this.paymentDetails.amount = details.purchase_units[0].amount.value;
    this.paymentDetails.payment_status = details.status;
    this.donateService.saveDonation(this.paymentDetails);
    this.router.navigate(['/']);

  }
}
