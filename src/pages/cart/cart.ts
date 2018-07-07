import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  uid = "oNXQHsyI5WanN7tZ1lt3IqK11Qs1";


  cartRef = firebase.database().ref("Users/"+this.uid).child("Cart/");
  public cartItems : Array<any> = [];


  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController, 
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.getCart();
  }

  getCart(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.cartRef.once('value', itemSnapshot => {
      this.cartItems = [];
      itemSnapshot.forEach(itemSnap => {
        var item = itemSnap.val();
        item.key = itemSnap.key;
        this.cartItems.push(item);
        return false;
      });
    }).then(()=>{
      loading.dismiss();
    }) ;
  }

  rfCart(key){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.cartRef.child(key).remove().then(()=>{
      this.getCart();
    }).then(()=>{
      loading.dismiss();
    })
  }



}
