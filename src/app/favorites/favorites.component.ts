import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http.service";
import { AlertService } from "../services/alert.service";
import { Server } from "../shared/server";
import { Tools } from "../shared/tools";
import { TreeNodeResponse } from "../api/treenode-response";

@Component({
  selector: 'kt-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  constructor(
      private httpService: HttpService,
      private alertService: AlertService) { }

  favorites;
  currentUserFullName: string;

  ngOnInit() {
    this.getFavorites();
  }

  // ------------------------------------------------------------------
  // Determines the user's favorites
  // ------------------------------------------------------------------
  async getFavorites() { 
    
    let username: string = Tools.getStorageValue('currentUser');
    this.currentUserFullName = Tools.getStorageValue('currentUserFullName');
    
    this.alertService.info("Favoriten werden ermittelt...");

    try {
    
      const response:TreeNodeResponse = await this.httpService
        .sendGetRequest(Server.WebApiUrl + "/user/" + username + "/favorites").toPromise();
        
      this.favorites = TreeNodeResponse.ToArray(response);

      if (this.favorites.length == 0)
        this.alertService.success("Keine Favoriten vorhanden");
      else
        this.alertService.clearMessage();
    } 
    catch(error) {
      this.alertService.error(error);
    }

    }
}
