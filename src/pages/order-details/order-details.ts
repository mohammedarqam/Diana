import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  Order = this.navParams.get("ordera")

  ordersRef = firebase.database().ref("Pending Orders/"+this.Order);
  public orderStatus : string;
  itemRef = this.ordersRef.child("Items/");
  public items : Array<any> = [];

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.getStatus();
    this.getItems();
  }

  getStatus(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.ordersRef.once('value', itemSnapshot => {
        this.orderStatus = itemSnapshot.val().Status;
        return false;
    }).then(()=>{
      this.itemRef.once('value', itemSnapshot => {
        this.items = [];
        itemSnapshot.forEach(itemSnap => {
          var temp = itemSnap.val();
          temp.Amount = parseInt(itemSnap.val().Quantity,10) * parseInt(itemSnap.val().Amount,10);
          this.items.push(temp);        
          return false;
        });
      }).then(()=>{
      loading.dismiss();
    });
  });
}
  getItems(){
  }
}
