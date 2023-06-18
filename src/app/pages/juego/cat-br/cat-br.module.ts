import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatBrPageRoutingModule } from './cat-br-routing.module';

import { CatBrPage } from './cat-br.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatBrPageRoutingModule
  ],
  declarations: [CatBrPage]
})
export class CatBrPageModule {}
