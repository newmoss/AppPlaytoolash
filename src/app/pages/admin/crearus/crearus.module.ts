import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearusPageRoutingModule } from './crearus-routing.module';

import { CrearusPage } from './crearus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearusPageRoutingModule
  ],
  declarations: [CrearusPage]
})
export class CrearusPageModule {}
