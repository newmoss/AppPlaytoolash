import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToSoportePageRoutingModule } from './to-soporte-routing.module';

import { ToSoportePage } from './to-soporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToSoportePageRoutingModule
  ],
  declarations: [ToSoportePage]
})
export class ToSoportePageModule {}
