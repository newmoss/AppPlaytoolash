import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToComunidadPageRoutingModule } from './to-comunidad-routing.module';

import { ToComunidadPage } from './to-comunidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToComunidadPageRoutingModule
  ],
  declarations: [ToComunidadPage]
})
export class ToComunidadPageModule {}
