import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatCarrerasPageRoutingModule } from './cat-carreras-routing.module';

import { CatCarrerasPage } from './cat-carreras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatCarrerasPageRoutingModule
  ],
  declarations: [CatCarrerasPage]
})
export class CatCarrerasPageModule {}
