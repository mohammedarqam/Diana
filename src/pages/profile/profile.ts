import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  uid = "oNXQHsyI5WanN7tZ1lt3IqK11Qs1";

  userRef = firebase.database().ref("Users/").child(this.uid);
  public user : Array<any> = [];

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams
  ) {
  }

  ionViewDidEnter(){
    this.getUser();
  }

  getUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.userRef.once('value', itemSnapshot => {
      this.user = [];
        this.user.push(itemSnapshot.val());
        return false;
    }).then(()=>{
      loading.dismiss();
    }) ;
  }



  gtOrders(){
    this.navCtrl.push("OrdersPage");
  }


}



