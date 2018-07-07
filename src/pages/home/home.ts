import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fmenu = "FoodMenuPage";
  smenu = "SmokeMenuPage";


  constructor(
  public navCtrl: NavController,
  ) {

  }
}
