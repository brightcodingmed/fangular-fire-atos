import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  search = '';
  allClients: Client[] = [];
  total: number = 0;
  clients: Client[] = [];

  constructor(private clientService: ClientService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClients()
        .subscribe((clients: Client[]) => {
          this.allClients = this.clients = clients;
          this.totalBalance();
          console.log(clients);
        })
  }

  deleteClient(id: string) {
    this.clientService.destroyClient(id)
              .then(() => {
                  this.flashMessage.show('client is deleted !!', {
                    cssClass: 'alert-warning',
                    timer: 5000
                  })
              })
              .catch()
  }


  totalBalance() {

    this.total = this.clients.reduce((accum, client)=> {
        return accum + (+client.balance);
    }, 0);

  }

  activeClient(client) {
     this.clientService.toggleActiveClient(client.id, client.active)
         .then(() => {
            this.messages(`client active: ${!client.active}`, 'alert-info', 4000);
         })
  }

  messages(data, css, ourTime) {
    this.flashMessage.show(data, {
      cssClass: css,
      timer: ourTime
    })
  }

  searchClients() {

      if(this.search) {

        this.allClients = this.clients.filter((client) => client.firstName.toLowerCase().includes(this.search.toLowerCase()) || client.lastName.toLowerCase().includes(this.search.toLowerCase()) || client.email.toLowerCase().includes(this.search))
      }else {
        this.allClients = this.clients;
      }
  }

}
