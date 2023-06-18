import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoresPageRoutingModule } from './listadores-routing.module';

import { ListadoresPage } from './listadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoresPageRoutingModule
  ],
  declarations: [ListadoresPage]
})
export class ListadoresPageModule {}
