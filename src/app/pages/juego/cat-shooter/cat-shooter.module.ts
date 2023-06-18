import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatShooterPageRoutingModule } from './cat-shooter-routing.module';

import { CatShooterPage } from './cat-shooter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatShooterPageRoutingModule
  ],
  declarations: [CatShooterPage]
})
export class CatShooterPageModule {}
