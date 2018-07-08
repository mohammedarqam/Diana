import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  uid = "oNXQHsyI5WanN7tZ1lt3IqK11Qs1";

  userOrdersRef = firebase.database().ref("Users/"+this.uid).child("Orders/");
  public userOrders : Array<any> = [];

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.getOrders();
  }

  getOrders(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();


    this.userOrdersRef.once('value', itemSnapshot => {
      this.userOrders = [];
      itemSnapshot.forEach(itemSnap => {
        this.userOrders.push(itemSnap.key);        
        return false;
      });
    }).then(()=>{
      loading.dismiss();
    });

  }

  gtDetails(order){
    this.navCtrl.push("OrderDetailsPage",{ordera : order});
  }



}
