import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    balance: new FormControl(null, Validators.required)
  });

  constructor(
         private clientService: ClientService,
         private flashMessage: FlashMessagesService,
         private router: Router
         ) { }

  ngOnInit() {
  }

  createClient() {
   this.clientService.addClient(this.clientForm.value)
       .then(() => {
          this.flashMessage.show('Client is created Successfully', {
            cssClass: 'alert-success',
            timer: 10000
          })
        
          this.router.navigate(['/clients']);
       })
                      
  }

}
