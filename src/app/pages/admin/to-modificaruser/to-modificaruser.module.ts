import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToModificaruserPageRoutingModule } from './to-modificaruser-routing.module';

import { ToModificaruserPage } from './to-modificaruser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToModificaruserPageRoutingModule
  ],
  declarations: [ToModificaruserPage]
})
export class ToModificaruserPageModule {}
