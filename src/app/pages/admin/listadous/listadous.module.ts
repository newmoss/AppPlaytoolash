import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadousPageRoutingModule } from './listadous-routing.module';

import { ListadousPage } from './listadous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadousPageRoutingModule
  ],
  declarations: [ListadousPage]
})
export class ListadousPageModule {}
