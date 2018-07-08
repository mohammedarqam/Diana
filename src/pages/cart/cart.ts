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
  data : boolean = false;
  tkey : string;

  cartRef = firebase.database().ref("Users/"+this.uid).child("Cart/");
  public cartItems : Array<any> = [];

  orderRef = firebase.database().ref("Pending Orders/");
  userOrderRef = firebase.database().ref("Users/"+this.uid).child("Orders");
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
      if(this.cartItems.length>0){
        this.data = true;
      }else{
        this.data = false;
      }
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

  order(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.orderRef.push({
      User : this.uid,
      Status : "Unpaid",
    }).then(result=>{
      this.tkey = result.getKey();
      this.orderRef.child(this.tkey + "/Items/").set(this.cartItems);
    }).then(()=>{
      this.userOrderRef.child(this.tkey).set("true");
    }).then(()=>{
      this.cartRef.remove();
    }).then(()=>{
      this.navCtrl.push("OrdersPage");
      loading.dismiss();
    })
  }

}
