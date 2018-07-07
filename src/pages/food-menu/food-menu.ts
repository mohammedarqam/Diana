import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import * as firebase from 'firebase';





@IonicPage()
@Component({
  selector: 'page-food-menu',
  templateUrl: 'food-menu.html',
})
export class FoodMenuPage {
  uid = "oNXQHsyI5WanN7tZ1lt3IqK11Qs1";
  
  menuRef= firebase.database().ref("Food Menu/");
  public menuItems : Array<any> = [];
  userRef = firebase.database().ref("Users/"+this.uid);
  cartRef = this.userRef.child("Cart/");
  public cartItems : Array<any> = [];

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController,
  public app : App, 
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.getMenu();
  }

  increase(i){
    this.menuItems[i].Quantity++;
  }

  decrease(i){
    this.menuItems[i].Quantity--;
  }

  atCart(){
    let loading = this.loadingCtrl.create({
      content: 'Adding to Cart..'
    });
    loading.present();

    this.menuItems.forEach(item =>{
      if(item.Quantity>0){
        this.cartRef.push(item).then(()=>{
          loading.dismiss();
        }).then(()=>{
          this.app.getRootNav().getActiveChildNav().select(1);
        }) ;
      }
    });

  }

  getMenu(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.menuRef.once('value', itemSnapshot => {
      this.menuItems = [];
      itemSnapshot.forEach(itemSnap => {
        var item = itemSnap.val();
        item.key = itemSnap.key;
        item.Quantity = 0;
        this.menuItems.push(item);
        return false;
      });
    }).then(()=>{
      loading.dismiss();
    }) ;
  }

}
