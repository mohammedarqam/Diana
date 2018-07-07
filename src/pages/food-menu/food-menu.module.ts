import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodMenuPage } from './food-menu';

@NgModule({
  declarations: [
    FoodMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodMenuPage),
  ],
})
export class FoodMenuPageModule {}
