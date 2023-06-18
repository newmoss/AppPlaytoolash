import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearjuegoPageRoutingModule } from './crearjuego-routing.module';

import { CrearjuegoPage } from './crearjuego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearjuegoPageRoutingModule
  ],
  declarations: [CrearjuegoPage]
})
export class CrearjuegoPageModule {}
