import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatAccionPageRoutingModule } from './cat-accion-routing.module';

import { CatAccionPage } from './cat-accion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatAccionPageRoutingModule
  ],
  declarations: [CatAccionPage]
})
export class CatAccionPageModule {}
