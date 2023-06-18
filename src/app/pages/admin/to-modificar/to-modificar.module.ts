import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToModificarPageRoutingModule } from './to-modificar-routing.module';

import { ToModificarPage } from './to-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToModificarPageRoutingModule
  ],
  declarations: [ToModificarPage]
})
export class ToModificarPageModule {}
