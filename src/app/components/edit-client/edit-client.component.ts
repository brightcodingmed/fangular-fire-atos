import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    balance: new FormControl(null, Validators.required),
    active: new FormControl()
  });

  id: string;

  constructor(
         private router: Router,
         private route: ActivatedRoute, 
         private clientService: ClientService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getOneClient(this.id);
  }

  getOneClient(id: string) {
     this.clientService.getClient(id)
         .subscribe((client: Client) => {
            this.clientForm.patchValue({
              'firstName': client.firstName,
              'lastName': client.lastName,
              'email': client.email,
              'phone': client.phone,
              'balance': client.balance,
              'active': client.active
            })
         });
  }

  updateClient() {
    this.clientService.updateClient(this.id, this.clientForm.value)
        .then(() => {
          this.router.navigate(['/clients']);
        })
        .catch()
  }

}
