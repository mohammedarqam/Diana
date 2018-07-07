import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmokeMenuPage } from './smoke-menu';

@NgModule({
  declarations: [
    SmokeMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SmokeMenuPage),
  ],
})
export class SmokeMenuPageModule {}
