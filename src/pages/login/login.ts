import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';





@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email :string;
  pass : string;

  userRef= firebase.database().ref("Users/");

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.checkUser();
  }


  checkUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.navCtrl.setRoot("TabsPage");
      }
      });

  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Signing In ...'
    });
    loading.present();


    firebase.auth().signInWithEmailAndPassword(this.email,this.pass).catch((error)=>{
      alert(error.message);
    }).then(()=>{
      this.navCtrl.setRoot("TabsPage");
    }).then(()=>{
      loading.dismiss();
    }) ;
  }




}
