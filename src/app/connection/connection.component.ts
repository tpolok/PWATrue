import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/connection.service';
import { Client, IClient } from '../model/client';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from "@angular/router";
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
  providers: [ConnectionService],
})
export class ConnectionComponent implements OnInit {

  _clients: Array<Client> = [];
  private _service: ConnectionService;
  public _newClient: Client = new Client();

  constructor(service: ConnectionService, private router: Router) {
    this._service = service;
   }
   
  ngOnInit() {
    this.getClients();
  }
  getClients = function() {
    this._service.getClients().then(clients => {
      this._clients = clients;
    }).catch(error => {
      console.error(error);
      alert(error.Message);
    });
  }

  checkClient = function(){
    var c:any;
    console.log("Hallo");
    this.getClients();
    for(c in this._clients){
      console.log(c);
      if(this._clients[c].Name == this._newClient.Name){
        console.log("preoui");
        if(this._clients[c].Password == this._newClient.Password){
          console.log("oui");
          console.log(c);
          this.router.navigate(['connected']);
        }
      }

    };
  }

  clearNewClient = function () {
    this._newClient = new Client();
  }
}
